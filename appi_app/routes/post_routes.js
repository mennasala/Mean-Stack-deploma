const router = require("express").Router();
const Post = require("../app/controller/post_controller");
const auth = require("../app/midleware/auth_midleware");
router.post("/add", auth, Post.addPost);
router.get("/myPosts", auth, Post.myPosts);

router.get("/getAll", auth, Post.getAll);
router.delete("/deleteAll", auth, Post.deleteAll);

router.get("/getSingle/:id", auth, Post.getSingle);
router.delete("/deleteSingle/:id", auth, Post.deleteSingle);
router.patch("/edit/:id", auth, Post.editSingle);
module.exports = router;
