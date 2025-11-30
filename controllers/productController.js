const Product = require('../models/Product');

exports.seedProducts = async (req, res, next) => {
  try {
    // Not used via API in normal run — see seedProducts.js script
    res.json({ message: 'use seedProducts.js script to seed' });
  } catch (err) { next(err); }
};


exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

