const Razorpay = require("razorpay");

dotenv = require("dotenv").config();

const instanceRazorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = instanceRazorPay;
