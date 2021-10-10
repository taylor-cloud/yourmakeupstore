const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const { body } = require('express-validator');

// Controlador
const brandController = require('../controllers/brands');

// Validación
const validator = [
    body('name').notEmpty().withMessage('El campo nombre es obligatorio. ')
];

// POST

router.post('/brand-add', auth.checkAuthentication, validator, brandController.postAddBrand);

router.post('/brand-edit', auth.checkAuthentication, validator, brandController.postEditBrand);

router.post('/brand-delete', auth.checkAuthentication, brandController.postDeleteBrand);


// GET

router.get('/brands', auth.checkAuthentication, brandController.getBrandsPage);

router.get('/brand-add', auth.checkAuthentication, brandController.getBrandAddPage);

router.get('/brand-edit', auth.checkAuthentication, brandController.getBrandEditPage);

router.get('/brand-delete', auth.checkAuthentication, brandController.getBrandDeletePage);

router.get('/search-brand', auth.checkAuthentication, brandController.getSearchBrand);

router.get('/get-brands', brandController.getBrandsOnly);

router.get('/brands/orderByIdAsc', auth.checkAuthentication, brandController.orderByIdAsc);

router.get('/brands/orderByIdDesc', auth.checkAuthentication, brandController.orderByIdDesc);

router.get('/brands/orderByName', auth.checkAuthentication, brandController.orderByName);

module.exports = router;