const projectModel = require("../../db/models/project_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");

class Project {
  static addProject = async (req, res) => {
    try {
      const newProject = new projectModel(req.body);
      await newProject.save();
      myHelper.sendResponse(res, 200, true, newProject, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  // static addBuildingToProject = async (req, res) => {
  //   try {
  //     // console.log("1 heloooooooooooooooo");
  //     const project = await projectModel.findById(req.body.projectId);
  //     project.buildings.push(req.body.buildingId);
  //     await project.save();
  //     // console.log(project);
  //     myHelper.sendResponse(
  //       res,
  //       200,
  //       true,
  //       project,
  //       "Added building to project successfully"
  //     );
  //   } catch (err) {
  //     // console.log("heloooooooooooooooo");
  //     myHelper.sendResponse(res, 500, false, err, err.message);
  //   }
  // };

  static showProjects = async (req, res) => {
    try {
      // console.log(req.user);
      const projects = await projectModel.find();
      // let newProjects = [];
      // projects.forEach((element) => {
      //   // console.log(element.projectType);
      //   newProjects.push({
      //     projectType: element.projectType,
      //     projectName: element.projectName,
      //   });
      // });
      myHelper.sendResponse(
        res,
        200,
        true,
        projects,
        "Fetched projects successfully"
      );
    } catch (err) {
      // console.log("heloooooooooooooooo");
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showSingleProject = async (req, res) => {
    try {
      const project = await projectModel.findById(req.params.id);
      myHelper.sendResponse(
        res,
        200,
        true,
        project,
        "Fetched Single project successfully"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static uploadImage = async (req, res) => {
    try {
      if (!req.file) throw new Error("No file Uploaded");
      const extention = path.extname(req.file.originalname);
      const newImageName = "images/" + Date.now() + "image" + extention;
      const newPath = "public/images/" + Date.now() + "image" + extention;
      console.log(newImageName);
      const project = await projectModel.findById(req.params.id);
      project.images.push(newImageName);
      await project.save();
      console.log(req.file.path);
      fs.renameSync(req.file.path, newPath);

      myHelper.sendResponse(res, 200, true, project, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static returnImage = async (req, res) => {
    try {
      const projectImages = await projectModel.findById(req.params.id);
      myHelper.sendResponse(
        res,
        200,
        true,
        projectImages.images,
        "returned successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = Project;
