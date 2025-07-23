const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get(process.env.MPESA_OAUTH_URL, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  return res.data.access_token;
};

const initiateSTKPush = async ({ phone, amount }) => {
  const accessToken = await getAccessToken();

  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone, // format: 2547XXXXXXXX
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "GamingStore",
    TransactionDesc: "Game purchase"
  };

  const res = await axios.post(process.env.MPESA_STK_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return res.data;
};

module.exports = { initiateSTKPush };
