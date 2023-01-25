const router = require("express").Router();
const { auth, methodsAuth } = require("../app/middleware/auth_middleware");
const Building = require("../app/controller/building_controller");
const upload = require("../app/middleware/upload_middleware");

router.post("/add", auth, methodsAuth, Building.addBuilding);
router.get("/showBuildings", Building.showBuildings);
router.get("/ShowSingleBuilding/:id", Building.showSingleBuilding);
router.post(
  "/uploadImage/:id",
  auth,
  methodsAuth,
  upload.single("building1"),
  Building.uploadImage
);
router.get("/returnBuildingImages/:id", Building.returnImage);

module.exports = router;
