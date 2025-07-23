const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const placeOrder = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty cart' });
  }

  const t = await sequelize.transaction();

  try {
    let total = 0;

    // Validate and calculate total
    for (const item of items) {
      const product = await Product.findByPk(item.id, { transaction: t });
      if (!product || product.stock < item.qty) {
        throw new Error(`Insufficient stock for ${product?.name || 'product'}`);
      }
      total += item.qty * product.price;
    }

    // Create order
    const order = await Order.create({ total }, { transaction: t });

    // Insert items and update stock
    for (const item of items) {
      const product = await Product.findByPk(item.id, { transaction: t });
      await product.decrement('stock', { by: item.qty, transaction: t });

      await OrderItem.create({
        orderId: order.id,
        productId: item.id,
        qty: item.qty,
        price: product.price,
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Order placed', orderId: order.id });

  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
};

module.exports = { placeOrder };
