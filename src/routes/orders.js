const { Router } = require('express');

// CONTROLLERS
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');
const orders = require('../controllers/orders');
const router = Router();

// ROUTES
router.post('/get', auth.validate, orders.get); // Get Orders - By UID (Auth Needed)
router.post('/add', auth.validate, orders.add); // Add Order (Auth Needed)

// EXPORTS
module.exports = router;