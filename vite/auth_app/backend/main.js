import "@std/dotenv/load";

import { Hono } from "hono";
import { logger } from "hono/logger";
import { getCookie, setCookie } from "hono/cookie";
import crypto from "node:crypto";

const app = new Hono();

app.use(logger());

const CLIENT_ID = Deno.env.get("OAUTH_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("OAUTH_CLIENT_SECRET");
const REDIRECT_URI = "http://localhost:8000/callback";
const AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
const TOKEN_URL = "https://github.com/login/oauth/access_token";

const stateStore = new Map();
const sessionStore = new Map();

function getSession(c) {
  let sessionId = getCookie(c, "sid");

  if (!sessionId || !sessionStore.has(sessionId)) {
    sessionId = crypto.randomBytes(16).toString("hex");
    sessionStore.set(sessionId, {});
    setCookie(c, "sid", sessionId, { httpOnly: true, path: "/" });
  }

  return sessionStore.get(sessionId);
}

app.get("/auth", (c) => {
  const state = crypto.randomBytes(32).toString("hex");
  stateStore.set(state, { timestamp: Date.now() });

  const authUrl = new URL(AUTHORIZATION_URL);
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", "read:user user:email");
  authUrl.searchParams.set("state", state);

  return c.redirect(authUrl.toString());
});

app.get("/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  const error = c.req.query("error");

  if (!state || !stateStore.has(state)) {
    return c.text("Invalid state parameter", 400);
  }
  stateStore.delete(state);

  if (error) {
    return c.text(`Authorization failed: ${error}`, 400);
  }

  if (!code) {
    return c.text("Authorization code missing", 400);
  }

  const session = getSession(c);

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      const { error: errorCode } = data;

      if (errorCode === "invalid_grant") {
        return c.text("Authorization code expired. Please try again.", 400);
      } else if (errorCode === "invalid_client") {
        return c.text("Server configuration error", 500);
      }

      return c.text("Token exchange failed", 500);
    }

    const { access_token, refresh_token, expires_in } = data;

    session.accessToken = access_token;
    session.refreshToken = refresh_token;
    session.tokenExpiry = Date.now() + expires_in * 1000;

    return c.redirect("/api/droplets");
  } catch {
    return c.text("Token exchange failed", 500);
  }
});

app.get("/api/droplets", async (c) => {
  const session = getSession(c);
  let accessToken = session.accessToken;

  if (!accessToken) {
    return c.redirect("/auth");
  }

  if (Date.now() >= session.tokenExpiry) {
    try {
      const refreshRes = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: session.refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      });

      const data = await refreshRes.json();

      if (!refreshRes.ok) {
        return c.redirect("/auth");
      }

      accessToken = data.access_token;
      session.accessToken = accessToken;
      session.tokenExpiry = Date.now() + data.expires_in * 1000;
    } catch {
      return c.redirect("/auth");
    }
  }

  try {
    const apiRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (apiRes.status === 401) {
      return c.redirect("/auth");
    }

    const data = await apiRes.json();
    return c.json(data, apiRes.status);
  } catch {
    return c.json({ error: "API request failed" }, 500);
  }
});

Deno.serve({ port: 8000 }, app.fetch);
