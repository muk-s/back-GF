const Product = require('../models/product');

const createProduct = async (req, res) => {
  try {
    const { name, price, actualPrice, description } = req.body;
    const imageFile = req.file ? req.file.filename : null;

    const product = await Product.create({ name, price, actualPrice, description, imageFile });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, actualPrice, description } = req.body;
    const imageFile = req.file ? req.file.filename : null;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({
      name,
      price,
      actualPrice,
      description,
      imageFile: imageFile || product.imageFile,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

