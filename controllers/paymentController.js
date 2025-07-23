const { initiateSTKPush } = require('../utils/mpesa');

const mpesaCheckout = async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) return res.status(400).json({ error: 'Phone and amount required' });

  try {
    const result = await initiateSTKPush({ phone, amount });
    res.status(200).json({ message: 'STK push sent', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mpesaCheckout };
