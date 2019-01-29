import express from "express";
import path from "path";

import renderer from "./handlers/renderer";

const app = express();

app.use(express.static(path.join(__dirname)));

app.get("*", renderer);

app.listen(3000, () => {
  console.log("Rendering on port 3000");
});
