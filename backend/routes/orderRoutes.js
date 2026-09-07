const express = require("express");
const {
  protected: protectedMiddleware,
} = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  createOrder,
  getOrders,
  myOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .post(protectedMiddleware, createOrder)
  .get(protectedMiddleware, admin, getOrders);
router.route("/myorders").get(protectedMiddleware, myOrders);
router.route("/:id/status").put(protectedMiddleware, admin, updateOrderStatus);

module.exports = router;
