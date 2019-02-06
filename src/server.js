require("dotenv").config();
import express from "express";
import path from "path";
import webpush from "web-push";
import bodyParser from "body-parser";

import renderer from "./handlers/renderer";
// import { Subscription } from "./models";

const app = express();

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

app.post("/subscribe", (req, res, next) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Congratulations",
    body: "Succesfully added subscription!"
  });

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.get("*", renderer);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Rendering on port ${PORT}`);
});
