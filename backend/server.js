// const express = require('express'); traditional way
import express from "express";
import { connectDB } from "./config/db.js"; // Import the connectDB function
import Product from "./models/product.model.js";

const app = express(); // Create an Express app

app.use(express.json()); // Middleware to parse JSON bodies allowing us to accept JSON data in request body

app.post("/api/products", async (req, res) => {
  // post creates a new product
  // Handle POST requests to /products
  const product = req.body; // User will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400) // Bad request if any field is missing
      .json({ success: false, message: "All fields are required" }); // Validate input
  }

  const newProduct = new Product(product); // Create a new product instance

  try {
    await newProduct.save(); // Save the product to the database
    res.status(201).json({ success: true, product: newProduct }); // Respond with the created product
  } catch (error) {
    console.error("Error saving product to database:", error); // Log any errors
    res.status(500).json({ success: false, message: "Server error" }); // Respond with server error
  }
});

// Postman desktop app or any other API testing tool can be used to test this endpoint
// You can use Postman to send a POST request to http://localhost:5000/products

app.listen(5000, () => {
  //1. Server is now running on port 5000 ✅

  connectDB(); //2. Now connect to database ✅
  console.log("Server started on http://localhost:5000");
});
