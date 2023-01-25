const router = require("express").Router();
const Unit = require("../app/controller/unit_controller");
const { methodsAuth, auth } = require("../app/middleware/auth_middleware");
const BookingController = require("../app/controller/booking_controller");

router.get("/checkout-session/:id", auth, BookingController.getCheckoutSession);
module.exports = router;
