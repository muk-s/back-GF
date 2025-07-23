const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate, placeOrder);

module.exports = router;
