const buildingModel = require("../../db/models/building_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");
class Building {
  static addBuilding = async (req, res) => {
    try {
      if (req.user.roleName == "regular-user") {
        throw new Error("Un Authorized to see this page");
      }
      const newBuilding = new buildingModel(req.body);
      await newBuilding.save();
      myHelper.sendResponse(res, 200, true, newBuilding, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showBuildings = async (req, res) => {
    try {
      // console.log("1 heloooooooooooooooo");
      const buildings = await buildingModel.find();
      let newBuildings = [];
      buildings.forEach((element) => {
        // console.log(element.projectType);
        newBuildings.push({
          buildingNumber: element.buildingNumber,
          buildingArea: element.buildingArea,
          numOfFloors: element.numOfFloors,
          numOfUnits: element.numOfFloors * 4,
        });
      });
      myHelper.sendResponse(
        res,
        200,
        true,
        newBuildings,
        "Fetched buildings successfully"
      );
    } catch (err) {
      // console.log("heloooooooooooooooo");
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showSingleBuilding = async (req, res) => {
    try {
      const building = await buildingModel.findById(req.params.id);
      // let newBuilding = [];
      // building.forEach((element) => {
      //   newBuilding.push({
      //     buildingNumber: element.buildingNumber,
      //     buildingArea: element.buildingArea,
      //     numOfFloors: element.numOfFloors,
      //     numOfUnits: element.numOfFloors * 4,
      //   });
      // });
      // console.log(req.i);
      myHelper.sendResponse(
        res,
        200,
        true,
        building,
        "Fetched Single building successfully"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static uploadImage = async (req, res) => {
    try {
      if (req.user.roleName == "regular-user") {
        throw new Error("Un Authorized to see this page");
      }
      if (!req.file) throw new Error("No file Uploaded");
      const extention = path.extname(req.file.originalname);
      const newImageName = "images/" + Date.now() + "image" + extention;
      const newPath = "public/images/" + Date.now() + "image" + extention;
      // console.log(newImageName);
      const building = await buildingModel.findById(req.params.id);
      building.images.push(newImageName);
      await building.save();
      // console.log(req.file.path);
      fs.renameSync(req.file.path, newPath);

      myHelper.sendResponse(res, 200, true, building, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static returnImage = async (req, res) => {
    try {
      const building = await buildingModel.findById(req.params.id);
      myHelper.sendResponse(
        res,
        200,
        true,
        building.images,
        "returned successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = Building;
