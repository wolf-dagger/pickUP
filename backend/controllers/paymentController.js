const instanceRazorPay = require("../config/razorPay");
const crypto = require("crypto");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const instance = new instanceRazorPay();

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order creation failed",
      error: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const order = await Order.findOne({ razorpay_order_id: razorpay_order_id });
    const secret = process.env.RAZORPAY_SECRET_KEY;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generated_signature === razorpay_signature) {
      order.paymentId = razorpay_payment_id;
      order.status = "pending";
      await order.save();
      res.status(200).json({
        message: "Payment verified successfully",
        order,
      });
    } else {
      res.status(400).json({
        message: "Payment verification failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Payment verification failed",
      error: err.message,
    });
  }
};

module.exports = { createOrder, verifyPayment };
