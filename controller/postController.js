const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Post = require("./../models/post");

exports.post_get = asyncHandler(async (req, res, next) => {
  res.render("post");
});

exports.post_post = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage("Post title must be 1-10000 characters long")
    .escape(),
  body("message")
    .trim()
    .isLength({ min: 1, max: 60000 })
    .withMessage("Post message must be 1-60000 characters long")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body.publish_date + "ratat");
    let publish_date = req.body.publish_date;
    if (req.body.publish_date == null || req.body.publish_date == "") {
      publish_date = new Date();
    }

    const post = new Post({
      message: req.body.message,
      title: req.body.title,
      publish_date: publish_date,
      date_created: new Date(),
    });

    if (!errors.isEmpty()) {
      res.render("post", { post: post, errors: errors.array() });
      return;
    } else {
      await post.save();
      res.redirect("/");
    }
  }),
];
