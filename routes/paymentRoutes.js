const express = require('express');
const router = express.Router();
const { mpesaCheckout } = require('../controllers/paymentController');

router.post('/mpesa/checkout', mpesaCheckout);

module.exports = router;
