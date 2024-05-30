const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const session = require("express-session");
//---------------------------------------------------------
const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);
//---------------------------------------------------------
const PORT = process.env.PORT || 8080;
const app = express();

app.use("/", express.static("../frontend/dist"));
app.use(express.json());

app.use("/", express.static("../frontend/dist"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my treasrjure",
    resave: true,
    saveUninitialized: false,
  })
);
app.use("/", require("./passport.js"));
//---------------------------------------------------------

app.get("/host", async (req, res) => {
  const host = await db("host").select("");
  res.send(host);
});

//---------------------------------------------------------

app.get("/product", async (req, res) => {
  const allProduct = await db.select("*").from("product");
  res.send(allProduct);
});

//---------------------------------------------------------

app.post("/product", async (req, res) => {
  const newProduct = req.body;
  const productId = await db("product").insert(newProduct, ["product_id"]);
  res.send(productId);
});

//---------------------------------------------------------

app.post("/problem", async (req, res) => {
  const newProblems = req.body;
  await db("problem").insert(newProblems);
  res.end();
});

//---------------------------------------------------------

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
