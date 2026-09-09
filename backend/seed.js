require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const seedDatabase = async () => {
  try {
    await connectDB();

    const password = await bcrypt.hash("Password123!", 10);
    const users = await User.bulkWrite([
      {
        updateOne: {
          filter: { email: "admin@pickup.test" },
          update: {
            $set: {
              name: "PickUp Admin",
              password,
              role: "admin",
              verified: true,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { email: "alex@example.com" },
          update: {
            $set: {
              name: "Alex Johnson",
              password,
              role: "user",
              verified: true,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { email: "sam@example.com" },
          update: {
            $set: {
              name: "Sam Williams",
              password,
              role: "user",
              verified: true,
            },
          },
          upsert: true,
        },
      },
    ]);

    const admin = await User.findOne({ email: "admin@pickup.test" });
    const alex = await User.findOne({ email: "alex@example.com" });

    const productData = [
      {
        name: "Classic White Sneakers",
        description:
          "Comfortable everyday sneakers with a clean classic design.",
        price: 2499,
        category: "Footwear",
        stock: 24,
        imageUrl: "https://placehold.co/600x600?text=White+Sneakers",
        rating: 4.5,
        numReviews: 18,
      },
      {
        name: "Everyday Cotton Hoodie",
        description: "Soft cotton hoodie for comfortable daily wear.",
        price: 1799,
        category: "Clothing",
        stock: 35,
        imageUrl: "https://placehold.co/600x600?text=Cotton+Hoodie",
        rating: 4.2,
        numReviews: 11,
      },
      {
        name: "Minimal Leather Backpack",
        description:
          "A durable backpack with room for work and travel essentials.",
        price: 3299,
        category: "Bags",
        stock: 12,
        imageUrl: "https://placehold.co/600x600?text=Leather+Backpack",
        rating: 4.7,
        numReviews: 26,
      },
      {
        name: "Wireless Headphones",
        description:
          "Lightweight wireless headphones with clear sound and long battery life.",
        price: 4199,
        category: "Electronics",
        stock: 18,
        imageUrl: "https://placehold.co/600x600?text=Headphones",
        rating: 4.4,
        numReviews: 31,
      },
    ];

    const products = [];
    for (const data of productData) {
      const product = await Product.findOneAndUpdate(
        { name: data.name },
        { $set: data },
        { new: true, upsert: true, runValidators: true },
      );
      products.push(product);
    }

    const [sneakers, hoodie, backpack] = products;
    const orders = await Order.bulkWrite([
      {
        updateOne: {
          filter: { paymentId: "seed-payment-001" },
          update: {
            $set: {
              user: alex._id,
              items: [
                { productId: sneakers._id, qty: 1, price: sneakers.price },
                { productId: hoodie._id, qty: 2, price: hoodie.price },
              ],
              totalAmount: sneakers.price + hoodie.price * 2,
              address: {
                fullName: "Alex Johnson",
                street: "12 Market Street",
                city: "New Delhi",
                postalCode: "110001",
                country: "India",
              },
              status: "delivered",
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { paymentId: "seed-payment-002" },
          update: {
            $set: {
              user: admin._id,
              items: [
                { productId: backpack._id, qty: 1, price: backpack.price },
              ],
              totalAmount: backpack.price,
              address: {
                fullName: "PickUp Admin",
                street: "45 Park Avenue",
                city: "Mumbai",
                postalCode: "400001",
                country: "India",
              },
              status: "shipped",
            },
          },
          upsert: true,
        },
      },
    ]);

    console.log(
      `Seed complete: ${users.upsertedCount} users, ${products.length} products, ${orders.upsertedCount} orders added or updated.`,
    );
    console.log("Demo password for all seeded users: Password123!");
  } catch (error) {
    console.error("Database seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
