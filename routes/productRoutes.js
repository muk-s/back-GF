const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const authenticate = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// File upload config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Public GET
router.get('/', getAllProducts);

// Admin-only protected
router.post('/', authenticate, adminOnly, upload.single('imageFile'), createProduct);
router.put('/:id', authenticate, adminOnly, upload.single('imageFile'), updateProduct);
router.delete('/:id', authenticate, adminOnly, deleteProduct);

module.exports = router;
