const router = require("express").Router();
const { auth, methodsAuth } = require("../app/middleware/auth_middleware");
const User = require("../app/controller/user_controller");
const upload = require("../app/middleware/upload_middleware");

router.post("/register", User.register);
router.post("/login", User.login);

router.get("/:id", auth, methodsAuth, User.all);
router.post(
  "/uploadImageToProfile",
  auth,
  upload.single("photo"),
  User.uploadImage
);

//profile
router.get("/me", auth, User.profile);
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutAll);
module.exports = router;
