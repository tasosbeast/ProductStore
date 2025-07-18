// const express = require('express'); traditional way
import express from "express";
import { connectDB } from "./config/db.js"; // Import the connectDB function

const app = express();

app.get("/products", (req, res) => {
  res.send("Server is ready!");
});

app.listen(5000, () => {
  connectDB(); // Connect to MongoDB
  console.log("Server started on http://localhost:5000");
});
