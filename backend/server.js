const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const session = require("express-session");
const path = require("path");

//---------------------------------------------------------
const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);
//---------------------------------------------------------
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use(express.static(__dirname + "../frontend/dist"));

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

app.post("/api/product", async (req, res) => {
  const newProduct = req.body;
  const productId = await db("product").insert(newProduct, ["product_id"]);
  res.send(productId);
});

//---------------------------------------------------------

app.post("/problem", async (req, res) => {
  const newProblems = req.body;
  await db("problem").insert(newProblems);
  res.send("created");
});

//---------------------------------------------------------

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
