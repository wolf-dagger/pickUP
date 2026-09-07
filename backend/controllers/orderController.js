const Order = require("../models/Order");

const sendEmail = require("../utils/sendEmail");

//create a new order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !address ||
      !paymentId
    ) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
    });
    await order.save();
    const Ordermessage = `Hello ${req.user.name},\n\nYour order has been placed successfully with order id ${order._id}. We will get back to you soon.\n\nThank you for using our service.`;
    await sendEmail(req.user.email, "Order Confirmation", Ordermessage);
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.productId",
      "name price",
    );

    if (!orders) {
      return res.status(400).json({
        message: "No orders found",
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order fetch failed",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order fetch failed",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();
    const messageStatus = `Hello ${order.user.name},\n\nYour order with order id ${order._id} has been ${order.status}.\n\nThank you for using our service.`;
    await sendEmail(order.user.email, "Order Status Updated", messageStatus);
    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order fetch failed",
    });
  }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };
