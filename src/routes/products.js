const { Router } = require('express');

const admin = require('../middleware/admin');
const products = require('../controllers/products');
const router = Router();

// ROUTES
router.get('/', products.get); // Get Products (All OR By Id)
router.get('/:id', products.get); // Get Products (By Id)
router.post('/add', admin.validate, products.add); // Add Product (Admin)
router.put('/update', admin.validate, products.update); // Update Product (Admin)
router.delete('/delete', admin.validate, products.remove); // Delete Product (Admin)

module.exports = router;