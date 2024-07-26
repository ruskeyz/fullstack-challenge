import express from "express";
import { json } from "body-parser";
import cors from "cors";

const createApp = () => {
  const app = express();
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    })
  );

  app.get("/user", (req, res) => {
    res.send({ data: "user" });
  });
  app.post("/user", (req, res) => {
    res.send({ data: "user" });
  });

  return app;
};

export default createApp;
