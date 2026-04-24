import { Hono } from "hono";
import { logger } from "hono/logger";
import "jsr:@std/dotenv/load";

const CLIENT_ID = Deno.env.get("OAUTH_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("OAUTH_CLIENT_SECRET");
const REDIRECT_URI = "http://localhost:8000/callback";
const AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
const TOKEN_URL = "https://github.com/login/oauth/access_token";

console.log({ CLIENT_ID });

const app = new Hono();

app.use(logger());

app.get("/auth", (c) => {
  const authorizationUrl = new URL(AUTHORIZATION_URL);
  authorizationUrl.searchParams.set("client_id", CLIENT_ID);
  authorizationUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authorizationUrl.searchParams.set("scope", "read:user user:email");

  return c.redirect(authorizationUrl);
});

app.get("/callback", async (c) => {
  const code = c.req.query("code");

  if (!code) {
    return c.text("code is not here");
  }

  try {
    const tokenURL = new URL(TOKEN_URL);
    tokenURL.searchParams.set("client_id", CLIENT_ID);
    tokenURL.searchParams.set("client_secret", CLIENT_SECRET);
    tokenURL.searchParams.set("redirect_uri", REDIRECT_URI);
    tokenURL.searchParams.set("code", code);

    await fetch(tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }).then(async (response) => {
      const result = await response.json();

      console.log({ result });

      const localAccessToken = Deno.env.get("ACCESS_TOKEN");
      if (!localAccessToken && result.access_token) {
        await Deno.writeTextFile(
          "./.env",
          `\nACCESS_TOKEN="${result.access_token}"`,
          {
            append: true,
          },
        );
      }

      c.redirect("http://localhost:8000/user");
    });
  } catch (error) {
    return c.text("some error occured with --> ", error.message);
  }
  return c.text("hello");
});

app.get("/user", async (c) => {
  const accessToken = Deno.env.get("ACCESS_TOKEN");
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();

    const imageUrl = data["avatar_url"];
    console.log({ imageUrl });

    const html = `<img src=${imageUrl} alt='error' />`;
    return c.html(html);
  }

  return c.text("error");
});

app.get("/", (c) => c.text("hello"));

Deno.serve({ port: 8000 }, app.fetch);
