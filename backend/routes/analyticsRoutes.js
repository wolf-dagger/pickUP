const express = require("express");
const { protected: protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getAdminStats } = require("../controllers/analyticsController.js");

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

module.exports = router;
