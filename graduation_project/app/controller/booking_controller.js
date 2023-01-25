const unitModel = require("../../db/models/unit_model");
const myHelper = require("../helper");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class Booking {
  static getCheckoutSession = async (req, res) => {
    try {
      // 1) Get the currently booked tour
      const unit = await unitModel.findById(req.params.id);
      // console.log(tour);

      //   console.log(req.user);
      // 2) Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `${req.protocol}://${req.get("host")}/showUnits}`,
        cancel_url: `${req.protocol}://${req.get("host")}/unit/showUnits`,
        customer_email: req.user.email,
        client_reference_id: req.params.id, // id of the unit
        line_items: [
          {
            name: `${unit.unitName} unit`,
            images: [`http://localhost:3000/images/${unit.images[0]}`],
            amount: unit.unitPrice,
            currency: "usd",
            quantity: 1,
          },
        ],
      });
      //   console.log(session);
      // 3) Create session as response
      myHelper.sendResponse(res, 200, true, session, "uploaded successfully");
    } catch (e) {
      console.log("helooooooooooooooooooooo");
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = Booking;
