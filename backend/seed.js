const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const users = [
  {
    name: "Demo Admin",
    email: "admin@pickup.test",
    password: "Admin@123",
    role: "admin",
    verified: true,
  },
  {
    name: "Demo Customer",
    email: "customer@pickup.test",
    password: "Customer@123",
    role: "user",
    verified: true,
  },
];

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 499,
    category: "Clothing",
    stock: 25,
    imageUrl: "https://placehold.co/600x600/png?text=White+T-Shirt",
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Canvas Backpack",
    description: "Durable backpack with room for daily essentials.",
    price: 1299,
    category: "Bags",
    stock: 15,
    imageUrl: "https://placehold.co/600x600/png?text=Backpack",
    rating: 4.2,
    numReviews: 8,
  },
  {
    name: "Running Shoes",
    description: "Lightweight shoes designed for everyday running.",
    price: 2499,
    category: "Footwear",
    stock: 10,
    imageUrl: "https://placehold.co/600x600/png?text=Running+Shoes",
    rating: 4.7,
    numReviews: 20,
  },
];

const seed = async () => {
  await connectDB();

  const userDocuments = {};
  for (const user of users) {
    const existingUser = await User.findOne({ email: user.email });
    userDocuments[user.email] =
      existingUser ||
      (await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }));
  }

  const productDocuments = {};
  for (const product of products) {
    productDocuments[product.name] = await Product.findOneAndUpdate(
      { name: product.name },
      { $setOnInsert: product },
      { new: true, upsert: true },
    );
  }

  const customer = userDocuments["customer@pickup.test"];
  const whiteTShirt = productDocuments["Classic White T-Shirt"];
  const backpack = productDocuments["Canvas Backpack"];

  const demoOrders = [
    {
      user: customer._id,
      items: [
        {
          productId: whiteTShirt._id,
          qty: 2,
          price: whiteTShirt.price,
        },
      ],
      totalAmount: whiteTShirt.price * 2,
      address: {
        fullName: "Demo Customer",
        street: "12 Market Street",
        city: "Mumbai",
        postalCode: "400001",
        country: "India",
      },
      paymentId: "demo_payment_001",
      status: "delivered",
    },
    {
      user: customer._id,
      items: [
        {
          productId: backpack._id,
          qty: 1,
          price: backpack.price,
        },
      ],
      totalAmount: backpack.price,
      address: {
        fullName: "Demo Customer",
        street: "12 Market Street",
        city: "Mumbai",
        postalCode: "400001",
        country: "India",
      },
      paymentId: "demo_payment_002",
      status: "pending",
    },
  ];

  for (const order of demoOrders) {
    await Order.findOneAndUpdate(
      { paymentId: order.paymentId },
      { $setOnInsert: order },
      { new: true, upsert: true },
    );
  }

  console.log("Seed data inserted successfully.");
  console.log("Admin login: admin@pickup.test / Admin@123");
  console.log("Customer login: customer@pickup.test / Customer@123");
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await require("mongoose").connection.close();
  });
