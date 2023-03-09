const express =require("express");
const {
    checkout,
    paymentVerification,
  }=require("../controllers/paymentControllers.js");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
  
router.route("/checkout").post(checkout);
  
router.route("/paymentverification").post(paymentVerification);

module.exports = router