import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  // Handle GET requests to /products
  // This endpoint will return all products
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({ success: true, count: products.length, products }); // Respond with the products
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    res.status(500).json({ success: false, message: "Server error" }); // Respond with server error
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
  // Handle PUT requests to update a product
  const { id } = req.params; // Get the product ID from the request parameters
  const product = req.body; // Get the product data from the request body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }); // Update the product in the database

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct, // Respond with the updated product
    });
  } catch (error) {
    console.error("Error updating product:", error); // Log any errors
    res.status(500).json({ success: false, message: "Server error" }); // Respond with server error
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      // If no product was found with the given ID
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    // If product was found and deleted
    res.status(200).json({ success: true, message: "Product deleted" }); // Respond with success message
  } catch (error) {
    // If there was an error during the deletion process
    // This could be due to a database error or if the ID format is invalid
    console.error("Error deleting product:", error); // Log any errors
    res.status(500).json({ success: false, message: "Server error" }); // Respond with server error
  }
};
