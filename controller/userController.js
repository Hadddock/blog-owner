const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("./../models/user");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up");
});

exports.sign_up_post = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage("Username must be between 3-64 charactesr")
    .custom(async (value) => {
      const usernameTaken = await User.findOne({ username: value }).exec();
      if (usernameTaken) {
        throw new Error("Username is already taken");
      }
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .escape(),
  body("confirm_password", "Passwords do not match")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      res.render("sign-up", { user: user, errors: errors.array() });
      return;
    } else {
      await user.save();
      res.redirect("/");
    }
  }),
];
