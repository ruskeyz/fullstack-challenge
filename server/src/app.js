import express from "express";
import { json } from "body-parser";
import cors from "cors";
import pg from "pg";
import { values } from "regenerator-runtime";

const createApp = () => {
  const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "novata",
    password: "example",
    port: 5555,
  });
  const app = express();
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    }),
  );

  // create new report
  app.post("/report", async (req, res) => {
    const { title, body } = req.body;
    const { rows } = await pool.query(
      `
INSERT INTO reports (title, description) VALUES ($1, $2)
`,
      [title, body],
    );

    res.json({ rows });
  });
  // Add metric to report
  app.put(`/report/:id`, async (req, res) => {
    const { id, data } = req.body;
    try {
      const query = {
        text: `UPDATE reports SET data = jsonb_set(data, '{metrics}', data -> 'metrics' || $2) WHERE uuid = $1
`,
        values: data,
      };
      const { rows } = await pool.query(query);
      res.json({ rows });
    } catch (err) {
      res.status(404).json(`Not found ${err.message}`);
    }
  });

  return app;
};

export default createApp;
