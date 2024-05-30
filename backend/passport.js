const express = require("express");
const router = express.Router();

const knex = require("knex");
const knexConfig = require("./knexfile");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('cry')

const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);


const User1 = {
  name: "Taro",
  password: "Taro123",
};

//入力されたパスワードとDBのパスワードを比較する
passport.use(
  new LocalStrategy(async (username, password, done) => {
   const matchName = await db("host").select("name").where("name", "=", username);
   

  })
);

passport.serializeUser((user, done) => {
  console.log("Serialize ...");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("Deserialize ...");
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

router.get("/api/failure", (req, res) => {
  console.log(req.session);
  res.send("Failure");
});

router.get("/api/success", (req, res) => {
  console.log(req.session);
  res.send("aiuo");
});

router.post(
  "/api",
  passport.authenticate("local", {
    failureRedirect: "/api/failure",
    successRedirect: "/host/allproducts",
  })
);

router.post("/api/logout", (req, res) => {
  req.session.passport.user = undefined;
  res.redirect("/");
});

module.exports = router;
