const express = require('express');
const router = express.Router();

const shop = require('../controllers/shop');

// Rutas de módulo shop

router.get('/', shop.getShopPage);

module.exports = router;