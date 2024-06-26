const express = require("express");
// const session = require("express-session");
const path = require("path");
const passport = require("./db/config/passport");
const bcrypt = require("bcrypt");
const db = require("./db/config/knex");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passport.authenticate("jwt", {
  session: false,
});

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
    const name = req.user.name;
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      maxAge: 60 * 5000,
      httpOnly: true,
    });
    res.status(200).send({ name });
  }
);

//---------------------------------------------------------

app.get(
  "/api/users/:userName/product",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const allProduct = await db
      .select("product_id", "product_name")
      .from("host")
      .join("product", "host.id", "=", "product.host_id")
      .where("name", "=", req.params.userName);
    res.send(allProduct);
  }
);

//---------------------------------------------------------

app.post(
  "/api/product",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
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
  }
);

//---------------------------------------------------------

app.post(
  "/api/problem",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const newProblems = req.body;
    await db("problem").insert(newProblems);
    res.send("created");
  }
);

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

app.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  const result = await db("product")
    .first()
    .join("problem", "product.product_id", "=", "problem.product_id")
    .where("product.product_id", productId);

  console.log(result);

  res.send({
    latitude: result.distination_latitude,
    longtitude: result.distination_longtitude,
    hint: result.next_distination_hint,
    question: result.question,
    correctAnswer: result.correct_answer,
    incorrectAnswer: result.incorrect_answer,
  });
});

//---------------------------------------------------------
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
