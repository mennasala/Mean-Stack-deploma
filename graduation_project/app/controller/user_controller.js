const userModel = require("../../db/models/user_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");

class User {
  static register = async (req, res) => {
    try {
      const newUser = new userModel(req.body);
      await newUser.save();
      myHelper.sendResponse(res, 200, true, newUser, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };
  static login = async (req, res) => {
    try {
      const userData = await userModel.loginUser(
        req.body.email,
        req.body.password
      );
      const token = await userData.generateToken();
      myHelper.sendResponse(
        res,
        200,
        true,
        { user: userData, token },
        "successfully logged in"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static all = async (req, res) => {
    res.send(req.method);
  };

  static uploadImage = async (req, res) => {
    try {
      if (!req.file) throw new Error("No file Uploaded");
      const extention = path.extname(req.file.originalname);
      const newImageName = "images/" + Date.now() + "image" + extention;
      const newPath = "public/images/" + Date.now() + "image" + extention;
      req.user.image = newImageName;
      await req.user.save();

      fs.renameSync(req.file.path, newPath);

      myHelper.sendResponse(res, 200, true, req.user, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static logOut = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      myHelper.sendResponse(res, 200, true, null, "logged out");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static logOutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        null,
        "logged out from all devices successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static profile = (req, res) => {
    myHelper.sendResponse(
      res,
      200,
      true,
      { user: req.user },
      "user profile fetched"
    );
  };
}
module.exports = User;
