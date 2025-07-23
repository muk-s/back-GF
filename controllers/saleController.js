const Sale = require('../models/sale');
const Product = require('../models/product');

const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const totalPrice = product.price * quantity;

    const sale = await Sale.create({ productId, quantity, totalPrice });
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: {
        model: Product,
        attributes: ['name', 'price'],
      },
    });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReport = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: {
        model: Product,
        attributes: ['name'],
      },
    });

    const report = sales.map(sale => ({
      id: sale.id,
      product: sale.Product.name,
      quantity: sale.quantity,
      total: sale.totalPrice,
    }));

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSale, getAllSales, getReport };
