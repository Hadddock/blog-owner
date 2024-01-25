const express = require("express");
const router = express.Router();

const user_controller = require("../controller/userController");
const post_controller = require("../controller/postController");

router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);

router.get("/post/:id", post_controller.post_detail_get);
router.post("/post/:id", post_controller.post_detail_post);

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);

router.post("/logout", user_controller.logout_post);

router.get("/post", post_controller.post_get);
router.post("/post", post_controller.post_post);

module.exports = router;
