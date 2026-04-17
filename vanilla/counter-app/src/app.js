import React from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";
import Counter from "./counterComponent.js";

const element = React.createElement(
  "div",
  { style: { color: "green" } },
  React.createElement("h1", null, "This is a counter"),
  React.createElement(Counter, { name: "counter-1" }),
  React.createElement(Counter, { name: "counter-two" }),
);

const root = createRoot(document.getElementById("root"));
root.render(element);
