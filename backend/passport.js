const express = require("express");
const router = express.Router();

const knex = require("knex");
const knexConfig = require("./knexfile");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
//---------------------------------------------------------------------------------------------------

const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);

//---------------------------------------------------------------------------------------------------

//入力されたパスワードとDBのパスワードを比較する
passport.use(
  new LocalStrategy(async (username, password, done) => {
    //DB情報とマッチしたら、ココに値が入るはず。。
    const matchUser = await db("host")
      .select("*")
      .where("name", "=", username)
      .catch(err => done(err));
    console.log(typeof matchUser[0].salt);
    //DB情報にマッチするものが無かった場合 (ここで処理終了)
    if (matchUser.length === 0) {
      console.log("一致する情報がありませんでした。");
      return done(null, false, { message: "Incorrect username or password." });
    }

    //---------------------------------------------------------------------------------------------------

    //パスワードをhash化して、DBパスワード(hash)と比較    （user_nameは一致した状態）
    crypto.pbkdf2(
      password,
      matchUser[0].salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        console.log("hashedPassword:", hashedPassword);
        if (err) {
          return done(err);
        }

        //パスワードが一致しなかった場合 (ここで処理終了)
        // if (!crypto.timingSafeEqual(matchUser[0].password, hashedPassword)) {
        //   return cb(null, false, { message: "ユーザーネームまたはパスワードが違います。" });
        // }
        if (hashedPassword !== matchUser[0].password) {
          console.log("ユーザーネームまたはパスワードが違います。");
          return done(null, false, { message: "ユーザーネームまたはパスワードが違います。" });
        }

        //パスワードが一致した場合ユーザー情報を返す
        return done(null, matchUser);
      }
    );
  })
);

//---------------------------------------------------------------------------------------------------

passport.serializeUser((user, done) => {
  console.log("Serialize ...");
  process.nextTick(() => {
    done(null, { id: user.id, username: user.name });
  });
});
//----------------------------------------------------

passport.deserializeUser((user, done) => {
  console.log("Deserialize ...");
  process.nextTick(() => {
    done(null, user);
  });
});
//----------------------------------------------------
//これこの位置？？？？？
router.use(passport.initialize());
router.use(passport.session());
//----------------------------------------------------

//処理を継続させたい時に使用するのがnext   ➡　参考サイト)　https://qiita.com/syumiwohossu/items/f9ee317f31adc3ad387b
router.post("/api/logout", (req, res, next) => {
  // req.session.passport.user = undefined;
  // res.redirect("/");
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//----------------------------------------------------
//res.render()	ビュー・テンプレートをレンダリングします。  参考サイト　https://expressjs.com/ja/guide/routing.html
router.post("/api/login", (req, res, next) => {
  res.render("login");
});
//----------------------------------------------------

router.post(
  "/api/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/api/login",
  })
);
// router.post(
//   "/api",
//   passport.authenticate("local", {
//     failureRedirect: "/api/failure",
//     successRedirect: "/host/allproducts",
//   })
// );

//----------------------------------------------------

router.get("/api/signup", function (req, res, next) {
  res.render("/host/allproducts");
});

//----------------------------------------------------

router.post("/api/signup", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  console.log("salt:", salt);
  console.log("salt:", typeof salt);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      //----------------------------
      console.log("req.body.username:", req.body.username);
      //DBインサート
      const postUser = await db("host").insert(
        {
          name: req.body.username,
          hashed_password: hashedPassword,
          salt: salt,
        },
        ["id"]
      );
      // .catch(err => next(err));

      console.log(postUser);

      const user = {
        id: postUser[0].id,
        name: req.body.name,
      };

      req.login(user, err => {
        if (err) {
          return next(err);
        }
        res.redirect("/host/allproducts");
      });
    }
  );
});

//----------------------------------------------------
router.get("/api/failure", (req, res) => {
  console.log(req.session);
  res.send("Failure");
});
//----------------------------------------------------

router.get("/api/success", (req, res) => {
  console.log(req.session);
  res.send("aiuo");
});
//----------------------------------------------------

module.exports = router;
