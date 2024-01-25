const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("./../models/user");
const passport = require("passport");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login");
});

exports.logout_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.login_post = asyncHandler(async (req, res) => {
  passport.authenticate("local", (err, user, options) => {
    if (user) {
      req.login(user, (error) => {
        if (error) {
          res.send(error);
        } else {
          console.log("Successfully authenticated");
          res.redirect("/");
        }
      });
    } else {
      res.render("login", {
        errors: [
          { msg: "Failed to login, check username and password are correct" },
        ],
      });
    }
  })(req, res);
});
