const express = require("express");
const router = express.Router();

const user_controller = require("../controller/userController");
const post_controller = require("../controller/postController");

router.get("/post/:id", post_controller.post_detail_get);
router.post("/post/:id", post_controller.post_detail_post);

router.post(
  "/post/:post_id/comment/:comment_id",
  post_controller.comment_delete
);

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);

router.post("/logout", user_controller.logout_post);

router.get("/post", post_controller.post_get);
router.post("/post", post_controller.post_post);

module.exports = router;
