const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Post = require("./../models/post");
const Comment = require("./../models/comment");

exports.post_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  }
  res.render("post");
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  if (req.params.post_id && req.params.comment_id) {
    const comment = await Comment.deleteOne({
      _id: req.params.comment_id,
    }).exec();
    // const post = await Post.findOne({ _id: req.params.post_id }).exec();
    // const comments = await Comment.find({ post: req.params.comment_id }).exec();
    res.redirect("/post/" + req.params.post_id);
  } else {
    res.sendStatus(404);
    return;
  }
});

exports.post_detail_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  }
  if (req.params.id) {
    const post = await Post.findOne({ _id: req.params.id }).exec();
    const comments = await Comment.find({ post: req.params.id })
      .populate("user")
      .exec();

    res.render("post-detail", { post: post, comments: comments });
  } else {
    res.sendStatus(404);
  }
});

exports.post_detail_post = [
  body("message")
    .trim()
    .isLength({ min: 1, max: 60000 })
    .withMessage("Comment must be 1-60000 characters long")
    .escape(),
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401);
    }

    const errors = validationResult(req);
    if (req.params.id && req.user) {
      const post = await Post.findOne({ _id: req.params.id }).exec();

      const comment = new Comment({
        message: req.body.message,
        post: req.params.id,
        user: req.user._id,
        date_created: new Date(),
      });

      if (!errors.isEmpty()) {
        res.render("post-detail", {
          post: post,
          comment: comment,
          errors: errors.array(),
        });
        return;
      } else {
        await comment.save();
      }

      res.redirect("/post/" + req.params.id);
    } else {
      res.sendStatus(404);
    }
  }),
];

exports.post_edit_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  }
  const post = await Post.findById(req.params.id).exec();
  res.render("post-edit", { post: post });
});

exports.post_edit_post = [
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
    if (!req.user) {
      res.sendStatus(401);
    }
    const errors = validationResult(req);

    const post = new Post({
      message: req.body.message,
      title: req.body.title,
      published: req.body.published === "true",
      edit_date: new Date(),
    });

    const result = await Post.updateOne(
      { _id: req.params.id },
      {
        message: req.body.message,
        title: req.body.title,
        published: req.body.published === "true",
        edit_date: new Date(),
      }
    ).exec();

    if (!errors.isEmpty()) {
      res.render("post", { post: post, errors: errors.array() });
      return;
    } else {
      res.redirect("/post/" + req.params.id);
    }
  }),
];

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
    if (!req.user) {
      res.sendStatus(401);
    }
    const errors = validationResult(req);

    const post = new Post({
      message: req.body.message,
      title: req.body.title,
      published: req.body.published === "true",
      date_created: new Date(),
      edit_date: new Date(),
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
