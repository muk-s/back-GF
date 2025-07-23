const express = require('express');
const router = express.Router();
const { createSale, getAllSales, getReport } = require('../controllers/saleController');
const authenticate = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

router.post('/', authenticate, createSale);
router.get('/', authenticate, getAllSales);
router.get('/report', authenticate, adminOnly, getReport);

module.exports = router;
