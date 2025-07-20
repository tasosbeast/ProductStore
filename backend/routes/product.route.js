import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts); // Handle GET requests to /products using the getProducts controller

router.post("/", createProduct); // Handle POST requests to /products using the createProduct controller

router.put("/:id", updateProduct); // Handle PUT requests to /products/:id using the updateProduct controller

// Postman desktop app or any other API testing tool can be used to test this endpoint
// You can use Postman to send a POST request to http://localhost:5000/products

router.delete("/:id", deleteProduct);

export default router;
