import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Feature } from "./featureClass.ts";

export const createApp = (featureManager: Feature) => {
  const app = new Hono();

  app.use("*", cors({ origin: "http://localhost:5173" }));

  app.use(logger());

  app.get("/features", (c) => c.json(featureManager.getFeatures()));

  app.post("/add-feature", async (c) => {
    const feature = await c.req.json();
    featureManager.addFeature(feature);

    return c.json({ success: true });
  });

  app.delete("/remove/:id", async (c) => {
    const featureId = c.req.param("id");
    featureManager.removeFeature(featureId);

    return c.json({ success: true });
  });

  app.patch("/upvote/:id", (c) => {
    const featureId = c.req.param("id");
    featureManager.upVote(featureId);

    return c.json({ success: true });
  });

  app.get("*", (c) => c.text("hello world"));

  return app;
};
