const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../controllers/auth');
const { body } = require('express-validator');

// Controlador
const productController = require('../controllers/products');

// Librería para subir imágenes.
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({

    // Establecer destinación de las imágenes subidas.
    destination: function(req, file, cb) {
        cb(null, 'public/img/uploads')
    },

    // Establecer nombre de la imagen subida.
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }

});

// Filtro de imágen (JPEG, PNG)
const imageFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Inicializando multer
const upload = multer( {
    storage: storage
}, {
    fileFilter: imageFilter
});

const validator = [

    // Nombre
    body('name').notEmpty().withMessage('El campo nombre es obligatorio. '),

    // Precio
    body('price').notEmpty().withMessage('El campo precio es obligatorio. '),
    body('price').isNumeric().withMessage('Debe digitar números en el campo precio. '),

    // Marca
    body('brand').isNumeric().withMessage('Debe seleccionar una marca. '),

    // Stock
    body('stock').notEmpty().withMessage('El campo stock es obligatorio. '),
    body('stock').isNumeric().withMessage('Debe digitar números en el campo stock. '),

    // Categoría
    body('category').isNumeric().withMessage('Debe seleccionar una categoría. '),

    // Subcategoría
    body('subcategory').isNumeric().withMessage('Debe seleccionar una subcategoría. '),

    // Descripción
    body('description').notEmpty().withMessage('Debe ingresar una descripción. '),
    body('description').isString().withMessage('Debe ingresar una descripción válida. '),

];

// POST

router.post('/product-add', upload.single('image'), auth.checkAuthentication, validator, productController.postAddProduct);

router.post('/product-edit', auth.checkAuthentication, validator, productController.postEditProduct);

router.post('/product-delete', auth.checkAuthentication, productController.postDeleteProduct);


// Rutas de módulo productos

router.get('/products', auth.checkAuthentication, productController.getProductsPage);

router.get('/product-add', auth.checkAuthentication, productController.getProductAddPage);

router.get('/product-edit', auth.checkAuthentication, productController.getProductEditPage);

router.get('/product-delete', auth.checkAuthentication, productController.getProductDeletePage);

router.get('/product-search', auth.checkAuthentication, productController.getProductSearch);

// Ordenar por

router.get('/products/orderByIdAsc', auth.checkAuthentication, productController.orderByIdAsc);

router.get('/products/orderByIdDesc', auth.checkAuthentication, productController.orderByIdDesc);

router.get('/products/orderByName', auth.checkAuthentication, productController.orderByName);

router.get('/products/orderByPriceAsc', auth.checkAuthentication, productController.orderByPriceAsc);

router.get('/products/orderByPriceDesc', auth.checkAuthentication, productController.orderByPriceDesc);

router.get('/products/orderByStock', auth.checkAuthentication, productController.orderByStock);

router.get('/products/orderByBrand', auth.checkAuthentication, productController.orderByBrand);

router.get('/products/orderByIdAsc', auth.checkAuthentication, productController.orderByIdAsc);

router.get('/products/orderByBrand', auth.checkAuthentication, productController.orderByBrand);

router.get('/products/orderBySubcategory', auth.checkAuthentication, productController.orderBySubcategory);

router.get('/products/orderByCategory', auth.checkAuthentication, productController.orderByCategory);

module.exports = router;