// app.js
import React from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";

// Create element using React.createElement
const element = React.createElement(
  "h1",
  { style: { color: "green" } },
  "Hello from React 19!"
);

// Render it
const root = createRoot(document.getElementById("root"));
root.render(element);

// index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React.createElement Example</title>
  <script type="module" src="app.js"></script>
</head>

<body>
  <div id="root"></div>
</body>

</html>
