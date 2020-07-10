const bcrypt = require("bcryptjs");

const express = require("express");

const router = express.Router();

const user = require("../users/user_model");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcrypt.hashSync(user.password, 10);
    credentials.password = hash;

    user
      .add(credentials)
      .then((user) => {
        res.status(201).json({
          data: user,
        });
      })
      .catch((err) => {
        console.log({ err });
        res.status(500).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "need un and pw",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    user
      .getting({ username: username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.loggedIn = true;
          req.session.user = user;
          res.status(200).json({
            message: `Hi, ${user.username}`,
          });
        } else {
          res.status(401).json({
            message: "Invalid credientials",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "need un and pw",
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("wont logging out");
      } else {
        res.send("you logged out");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
