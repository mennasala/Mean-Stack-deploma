const router = require("express").Router();
const User = require("../app/controller/user_controller");
const auth = require("../app/midleware/auth_midleware");
const upload = require("../app/midleware/upload_midleware");

router.post("/register", User.register);
router.post("/login", User.login);

router.get("/", auth, User.all);

//profile
router.get("/me", auth, User.profile);

//logout
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutAll);
//show single user
router.get("/single/:id", auth, User.getSingle);
//activate & deactivate status
router.post("/changeStatus", auth, User.changeStatus);
//edit my profile or other profiles
router.post("/editProfile", auth, User.editProfile);

//delete me or any user
router.patch("/deleteUser", auth, User.deleteProfile);

//add address
router.post("/addAdress", auth, User.addAdress);

//delete address
router.post("/deleteAddress",auth,User.deleteAddress)
//show all addresses
router.get("/allAdresses", auth, User.allAdresses);
//show single address
router.get("/getSingleAddress/:id", auth, User.singleAddress);
router.patch(
  "/uplaodImgToProfile",
  auth,
  upload.single("mennaImage"),
  User.uploadImage
);
module.exports = router;
