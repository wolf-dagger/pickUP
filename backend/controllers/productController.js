const Product = require("../models/Product");

const cloudinary = require("../config/cloudinary");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      return res.status(400).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: `Product fetch failed: ${err}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: `Product fetch failed: ${err}`,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "Product creation failed",
      error: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    if (req.file) {
      const oldImagePublicId = product.imagePublicId;
      const result = await cloudinary.uploader.upload(req.file.path);
      product.imageUrl = result.secure_url;
      product.imagePublicId = result.public_id;

      if (oldImagePublicId) {
        await cloudinary.uploader.destroy(oldImagePublicId);
      }
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: `Product update failed: ${err}`,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: `Product deletion failed: ${err}`,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
