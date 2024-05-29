const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/", express.static("../frontend/dist"));

app.get("/host", async (req, res) => {
  const host = await db("host").select("");
  res.send(host);
});

// app.get("/product", async (req, res) => {
//   const host = await db("host").select("");
//   res.send(host);
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
