const express = require("express");
const router = express.Router();

const user_controller = require("../controller/userController");
const post_controller = require("../controller/postController");

router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);

router.get("/post", post_controller.post_get);
router.post("/post", post_controller.post_post);

module.exports = router;
