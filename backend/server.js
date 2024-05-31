const express = require("express");
// const session = require("express-session");
const path = require("path");
const passport = require("./db/config/passport");
const bcrypt = require("bcrypt");
const db = require("./db/config/knex");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.use(express.urlencoded({ extended: false }));

//---------------------------------------------------------

app.post("/api/signup", async (req, res) => {
  const { name, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);
  try {
    const duplicateName = await db("host").select("name").where({ name });
    if (!duplicateName.length) {
      const userId = await db("host")
        .insert({
          name,
          salt,
          password: hashedPass,
        })
        .returning("id");
      res.status(200).send(userId[0]);
    } else {
      res.status(409).end();
    }
  } catch (error) {
    res.status(500).end();
  }
});

//---------------------------------------------------------

app.post(
  "/api/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.status(200).send(req.user);
  }
);

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
  res.send("created");
});

//---------------------------------------------------------
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
