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
  deleteUser,
  makeAdmin,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protectedMiddleware, admin, getAllUsers);
router.delete("/users/:id", protectedMiddleware, admin, deleteUser);
router.put("/users/:id/admin", protectedMiddleware, admin, makeAdmin);

module.exports = router;
