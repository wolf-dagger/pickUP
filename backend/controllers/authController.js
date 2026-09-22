const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Welcome ${newUser.name} to pickUp, we are glad to have you on board. Thanks for registering with us. We are eager to fill you with the best experience. To complete your registration, please enter the following OTP: Your OTP is ${otp}.
    This OTP is valid for 24 hours only.`;

    await sendEmail(email, "Welcome to pickUp - Your OTP", message);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id),
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "User creation failed",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({
        message: "Incorect credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        token: generateToken(userExists._id),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "User login failed",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users) {
      return res.status(400).json({
        message: "No users found",
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: `User fetch failed: ${err}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: `User deletion failed: ${err}`,
    });
  }
};

const makeAdmin = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "User is already an admin",
      });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({
      message: "User made admin successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to make user admin: ${err}`,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  makeAdmin,
};
