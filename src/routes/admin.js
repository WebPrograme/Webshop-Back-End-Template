const { Router } = require('express');

// CONTROLLERS
const adminAuth = require('../middleware/admin');
const { Orders, Admin } = require('../controllers/admin');
const router = Router();

// ROUTES - LOGIN
router.post('/login', adminAuth.validate, Admin.login); // Login (Admin)

// ROUTES - ORDERS
router.post('/orders/get', adminAuth.validate, Orders.get); // Get Orders (Admin)
router.put('/orders/update', adminAuth.validate, Orders.update); // Update Order (Admin)

// EXPORTS
module.exports = router;