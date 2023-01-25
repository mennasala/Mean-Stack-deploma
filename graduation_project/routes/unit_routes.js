const router = require("express").Router();
const Unit = require("../app/controller/unit_controller");
const { methodsAuth, auth } = require("../app/middleware/auth_middleware");
const upload = require("../app/middleware/upload_middleware");

router.post("/addUnit", auth, methodsAuth, Unit.addUnit);
router.get("/showUnits", Unit.showUnits);
router.get("/showSingleUnit/:id", Unit.showSingleUnit);
router.post(
  "/uploadImage/:id",
  auth,
  methodsAuth,
  upload.single("unit1"),
  Unit.uploadImage
);
router.get("/returnUnitImages/:id", Unit.returnImage);

module.exports = router;
