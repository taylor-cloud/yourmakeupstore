const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

const categoryController = require('../controllers/categories');

// Rutas de módulo categorías

router.get('/categories', auth.checkAuthentication, categoryController.getCategoriesPage);

router.get('/get-categories', categoryController.getCategoriesOnly);

router.get('/categories/orderByIdAsc', categoryController.orderByIdAsc);

router.get('/categories/orderByIdDesc', categoryController.orderByIdDesc);

router.get('/categories/orderByName', categoryController.orderByName);

module.exports = router;