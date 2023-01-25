const jwt = require("jsonwebtoken");
const userModel = require("../../db/models/user_model");
const roleModel = require("../../db/models/role_model");
const urlModel = require("../../db/models/url_model");
const myHelper = require("../helper");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.tokenPass);
    const userData = await userModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!userData) throw new Error("Invalid  token");

    req.user = userData;
    req.token = token;
    next();
  } catch (err) {
    myHelper.sendResponse(res, 500, false, err, err.message);
  }
};

const methodsAuth = async (req, res, next) => {
  try {
    const role = await roleModel.findById(req.user.roleId);
    if (!role) throw new Error("Invalid  user role");
    req.role = role;
    let origURL = req.originalUrl;
    // console.log(origURL);
    const key = Object.keys(req.params);
    const value = Object.values(req.params);
    value.forEach((el, i) => {
      origURL = origURL.replace(el, ":" + key[i]);
    });
    // console.log(origURL);
    const Url = await urlModel.findOne({
      url: origURL,
      method: req.method,
      "roles.roleId": req.user.roleId,
    });
    // console.log(Url);
    if (!Url) throw new Error("unAuthorized");
    next();
  } catch (err) {
    myHelper.sendResponse(res, 500, false, err, err.message);
  }
};
module.exports = { auth, methodsAuth };
