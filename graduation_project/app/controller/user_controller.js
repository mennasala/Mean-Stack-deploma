const userModel = require("../../db/models/user_model");
const unitModel = require("../../db/models/unit_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");
const PDF = require("./pdf_controller");

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

      fs.renameSync(req.file.path, newPath);
      await req.user.save();

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
    //console.log(req.user);
    myHelper.sendResponse(
      res,
      200,
      true,
      { user: req.user },
      "user profile fetched"
    );
  };

  static buy = async (req, res) => {
    try {
      const unit = await unitModel.findById(req.params.id);
      let message;
      const money = req.body.money;
      const paymentMethod = req.body.paymentMethod;
      let price = 0;
      let num = 0,
        pay;
      if (unit.unitAvailability) {
        price = unit.unitPrice;
        if (paymentMethod == "cash") {
          if (money < price) {
            message = `sorry, but unit price is ${unit.unitPrice} and you paid only ${money}`;
            throw new Error(message);
          } else {
            message = "Booked successfully";
            price = 0;
          }
        } else {
          if (paymentMethod == "annual") {
            num = 5;
            pay = "year";
          } else {
            num = 10;
            pay = "6 months";
          }
          price -= money;
          message = `you will pay ${price / num}$ every ${pay}`;
        }
        unit.unitAvailability = false;
        await unit.save();
        req.user.boughts.push({
          unitId: unit._id,
          unitPrice: unit.unitPrice,
          howMuchPaid: money,
          howMuchRemain: price,
          numberOfRemainingInstallments: num,
          installmentِAmount: price / num,
        });
        await req.user.save();
      } else {
        message = "Sorry this unit is bought before";
        throw new Error(message);
      }
      PDF.generatePdf(true, req, res, unit);
      // myHelper.sendResponse(res, 200, true, unit, message);
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static payPremium = async (req, res) => {
    try {
      let unitidx = -1;
      for (let i = 0; i < req.user.boughts.length; i++) {
        if (String(req.user.boughts[i].unitId) == req.body.unitId) {
          unitidx = i;
          break;
        }
      }
      let messag;
      if (unitidx == -1) {
        messag = "sorry you have entered a wrong unit id";
        throw new Error(messag);
      } else {
        if (req.user.boughts[unitidx].numberOfRemainingInstallments == 0) {
          messag = "You have paid all your installments already";
          throw new Error(messag);
        } else {
          const payAmount = req.user.boughts[unitidx].installmentِAmount;
          if (req.body.money < payAmount) {
            messag = `sorry, but you have to pay ${payAmount} for the premium and you are paying only ${req.body.money}`;
            throw new Error(messag);
          } else {
            req.user.boughts[unitidx].howMuchPaid += req.body.money;
            req.user.boughts[unitidx].howMuchRemain -= req.body.money;
            req.user.boughts[unitidx].numberOfRemainingInstallments -= 1;
            messag = "paid successfully";
            await req.user.save();
            PDF.generatePdf(false, req, res, req.user.boughts[unitidx]);
          }
        }
      }
      // myHelper.sendResponse(res, 200, true, req.user.boughts[unitidx], messag);
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static editProfile = async (req, res) => {
    try {
      let user = req.user;
      const data = req.body;
      // console.log(data);
      for (const key in data) {
        if (data[key] != null) {
          user[key] = data[key];
          // console.log(key);
        }
      }
      await user.save();
      myHelper.sendResponse(res, 200, true, user, "updated successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static returnImage = async (req, res) => {
    try {
      const image = req.user.image;
      myHelper.sendResponse(res, 200, true, image, "returned successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = User;
