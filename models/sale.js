const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const Sale = sequelize.define('Sale', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Product.hasMany(Sale, { foreignKey: 'productId' });
Sale.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Sale;
