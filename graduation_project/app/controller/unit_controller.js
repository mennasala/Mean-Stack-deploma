const unitModel = require("../../db/models/unit_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");
class Unit {
  static addUnit = async (req, res) => {
    try {
      const newUnit = new unitModel(req.body);
      await newUnit.save();
      myHelper.sendResponse(res, 200, true, newUnit, "Added Unit successfully");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showUnits = async (req, res) => {
    try {
      const units = await unitModel.find();
      myHelper.sendResponse(
        res,
        200,
        true,
        units,
        "Fetched units successfully"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showSingleUnit = async (req, res) => {
    try {
      const unit = await unitModel.findById(req.params.id);
      myHelper.sendResponse(
        res,
        200,
        true,
        unit,
        "Fetched single unit successfully"
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
      // console.log(newImageName);
      const unit = await unitModel.findById(req.params.id);
      // console.log(unit);
      unit.images.push(newImageName);
      await unit.save();
      // console.log(req.file.path);
      fs.renameSync(req.file.path, newPath);

      myHelper.sendResponse(res, 200, true, unit, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static returnImage = async (req, res) => {
    try {
      const unit = await unitModel.findById(req.params.id);
      myHelper.sendResponse(
        res,
        200,
        true,
        unit.images,
        "returned successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = Unit;
