const router = require("express").Router();
const { auth, methodsAuth } = require("../app/middleware/auth_middleware");
const User = require("../app/controller/user_controller");
const upload = require("../app/middleware/upload_middleware");

router.post("/register", User.register);
router.post("/login", User.login);

router.post(
  "/uploadImageToProfile",
  auth,
  upload.single("photo"),
  User.uploadImage
);

router.get("/returnImageProfile", auth, User.returnImage);
//profile
router.get("/me", auth, User.profile);
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutAll);
//router.get("/:id", auth, methodsAuth, User.all);

router.post("/editProfile", auth, User.editProfile);
router.post("/payPremium", auth, User.payPremium);
router.post("/buy/:id", auth, User.buy);
module.exports = router;
