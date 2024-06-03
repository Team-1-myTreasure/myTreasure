const express = require("express");
const session = require("express-session");
const db = require("./knex");
const bcrypt = require("bcrypt");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      session: false,
    },
    async (name, password, done) => {
      const userInfo = await db
        .select("id", "name", "password")
        .from("host")
        .where({ name });
      if (userInfo.length === 0) {
        return done(null, false, { message: "Incorrect name" });
      }
      if (bcrypt.compareSync(password, userInfo[0].password)) {
        return done(null, userInfo[0]);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    }
  )
);

module.exports = passport;
