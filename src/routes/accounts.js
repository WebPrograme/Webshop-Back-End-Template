const { Router } = require('express');

// CONTROLLERS
const auth = require('../middleware/auth')
const { Account, Cart, Favorites } = require('../controllers/accounts');
const router = Router();

// ROUTES - LOGIN & REGISTER
router.post('/login', auth.validate, Account.login); // Login (Auth Needed)
router.post('/register', Account.register); // Register

// ROUTES - CART
router.post('/cart/get', auth.validate, Cart.get); // Get Cart (Auth Needed)
router.put('/cart/update', auth.validate, Cart.update); // Update Cart (Auth Needed)

// ROUTES - FAVORITES
router.post('/favorites/get', auth.validate, Favorites.get); // Get Favorites (Auth Needed)
router.put('/favorites/update', auth.validate, Favorites.update); // Update Favorites (Auth Needed)

// EXPORTS
module.exports = router;