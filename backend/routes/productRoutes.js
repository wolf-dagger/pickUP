const express = require("express");

const {
  protected: protectedMiddleware,
} = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// ass products
router
  .route("/")
  .get(getProducts)
  .post(protectedMiddleware, admin, upload.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protectedMiddleware, admin, upload.single("image"), updateProduct)
  .delete(protectedMiddleware, admin, deleteProduct);

module.exports = router;
