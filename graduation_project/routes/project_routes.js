const router = require("express").Router();
const { auth, methodsAuth } = require("../app/middleware/auth_middleware");
const Project = require("../app/controller/project_controller");
const upload = require("../app/middleware/upload_middleware");

router.post("/add", auth, methodsAuth, Project.addProject);

router.post(
  "/uploadImage/:id",
  auth,
  methodsAuth,
  upload.single("project1"),
  Project.uploadImage
);
// router.post("/addBuilding", auth, methodsAuth, Project.addBuildingToProject);
router.get("/showProjects", Project.showProjects);
router.get("/showSingleProject/:id", Project.showSingleProject);
router.get("/returnProjectImages/:id", Project.returnImage);

module.exports = router;
