const express = require("express");
const PDF = require("../app/controller/pdf_controller");
const { methodsAuth, auth } = require("../app/middleware/auth_middleware");

const router = express.Router();
router.get("/invoice", auth, PDF.generatePdf);

module.exports = router;
