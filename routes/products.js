const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

const productsController = require('../controllers/products');

// Rutas de módulo productos

router.get('/maquillaje', productsController.getProductsList);

router.get('/skincare', productsController.getProductsList);

router.get('/cabello', productsController.getProductsList);

router.get('/accesorios', productsController.getProductsList);

router.get('/detalle', productsController.getProductDetailPage);

router.get('/product-search', productsController.getProductSearchUser);

module.exports = router;