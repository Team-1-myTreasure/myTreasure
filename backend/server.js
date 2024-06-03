const express = require("express");
// const session = require("express-session");
const path = require("path");
const passport = require("./db/config/passport");
const bcrypt = require("bcrypt");
const db = require("./db/config/knex");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passportJwt = require("passport-jwt");

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
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
      const userName = await db("host")
        .insert({
          name,
          salt,
          password: hashedPass,
        })
        .returning("name");
      res.status(200).send(userName[0]);
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
    const token = jwt.sign(req.user, "secret");
    console.log(typeof token);
    const name = req.user.name;
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      maxAge: 60 * 1000,
      httpOnly: true,
    });
    // res.status(200).send({ name, token });
    res.json({ token });
  }
);

//---------------------------------------------------------

app.get("/api/users/:userName/product", async (req, res) => {
  const allProduct = await db
    .select("product_id", "product_name")
    .from("host")
    .join("product", "host.id", "=", "product.host_id")
    .where("name", "=", req.params.userName);
  res.send(allProduct);
});

//---------------------------------------------------------

app.post("/api/product", async (req, res) => {
  const { productName, hostName } = req.body;

  const host = await db("host").first("id").where("name", hostName);

  const productId = await db("product").insert(
    {
      host_id: host.id,
      product_name: productName,
    },
    ["product_id"]
  );
  res.send(productId);
});

//---------------------------------------------------------

app.post("/api/problem", async (req, res) => {
  const newProblems = req.body;
  await db("problem").insert(newProblems);
  res.send("created");
});

app.post("/api/gest/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { playerName } = req.body;

  const result = await db(
    db.raw("?? (??, ??, ??)", [
      "player",
      "product_id",
      "player_name",
      "progress_state",
    ])
  )
    .insert(
      db
        .select(db.raw("?, ?, ?", [productId, playerName, 0]))
        .whereNotExists(db("player").where("player_name", playerName))
    )
    .returning("*");

  if (result.length === 0) {
    res.status(409).send();
    return;
  }
  res.status(201).send({ playerName: playerName });
});

//---------------------------------------------------------
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
