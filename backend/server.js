// const express = require('express'); traditional way
import express from "express";
import { connectDB } from "./config/db.js"; // Import the connectDB function
import productRoutes from "./routes/product.route.js"; // Import product routes
const app = express(); // Create an Express app

app.use(express.json()); // Middleware to parse JSON bodies allowing us to accept JSON data in request body

app.use("/api/products", productRoutes); // Mount the product routes

app.listen(5000, () => {
  //1. Server is now running on port 5000 ✅

  connectDB(); //2. Now connect to database ✅
  console.log("Server started on http://localhost:5000");
});
