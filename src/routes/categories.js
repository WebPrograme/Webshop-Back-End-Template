const { Router } = require('express');

const categories = require('../controllers/categories');
const router = Router();

// ROUTES
router.get('/', categories.get); // Get all Categories

// EXPORTS
module.exports = router;