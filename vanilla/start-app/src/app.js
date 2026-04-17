import React from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";

const element = React.createElement(
  "h1",
  { style: { color: "green" } },
  "Hello from React!",
);

const root = createRoot(document.getElementById("root"));
root.render(element);