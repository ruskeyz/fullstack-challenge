import express from "express";
import { json } from "body-parser";
import cors from "cors";
import pg from "pg";
import { async } from "regenerator-runtime";
import { error } from "console";

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
    const { title, description } = req.body;
    const { rows } = await pool.query(
      `
INSERT INTO reports (title, description) VALUES ($1, $2) RETURNING (title, description)
`,
      [title, description],
    );

    res.json({ rows });
  });
  // Add metric to report
  app.post("/metrics/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body.metric;
    try {
      const { rows } = await pool.query(
        `UPDATE reports SET data = jsonb_set(data, '{metrics}', data -> 'metrics' || $2) WHERE uuid = $1`,
        [id, data],
      );
      res.json({ rows });
    } catch (err) {
      res.status(404).json(`Not found ${err.message}`);
    }
  });

  // get all reports
  app.get("/reports", async (req, res) => {
    const { rows } = await pool.query(`
SELECT * FROM reports;
`);
    res.json({ rows });
  });
  app.get("/reports/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const { rows } = await pool.query(
        `
SELECT * FROM reports WHERE uuid=$1
      `,
        [id],
      );
      res.json({ rows });
    } catch (e) {
      res.json({ e });
    }
  });
  //delete report
  app.post("/reports/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await pool.query(
        `
DELETE FROM reports where uuid=$1;
      `,
        [id],
      );
      res.json("all good");
    } catch (e) {
      console.log(e);
      res.json({ e });
    }
  });

  return app;
};

export default createApp;
