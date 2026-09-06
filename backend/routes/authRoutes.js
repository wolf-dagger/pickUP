const express = require("express");
const router = express.Router();
const {
  protected: protectedMiddleware,
} = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protectedMiddleware, admin, getAllUsers);

module.exports = router;
