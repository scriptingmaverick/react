import { createApp } from "./src/app.ts";
import { Feature } from "./src/featureClass.ts";

export type FeatureProps = {
  name: string;
  creator: string;
  id: string;
  likes: number;
};

const features = [
  { id: "1", name: "user board", creator: "khasim", likes: 40 },
  { id: "2", name: "dashboard", creator: "jaanu", likes: 90 },
  { id: "3", name: "skeletons", creator: "chris", likes: 75 },
  // { id: "4", name: "jeera", creator: "krish", likes: 23 },
  // { id: "5", name: "meta stash", creator: "joe", likes: 677 },
  // { id: "6", name: "chat baord", creator: "khasim", likes: 2315 },
];

const main = () => {
  const featureManager = new Feature(features);

  const app = createApp(featureManager);

  Deno.serve({ port: 8000 }, app.fetch);
};

main();
