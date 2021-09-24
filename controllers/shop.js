const auth = require('./auth');
const product = require('../models/dao-product');

// Renderiza la página index.
exports.getShopPage = (req, res, next) => {
    // Abajo del carrusel, mostrará los seis nuevos productos que se hayan agregado.
    product.getNewProducts().then(products => {
        res.render('user/index', {
            pageTitle: 'YOURMAKEUPSTORE',
            products: products,
            isAuth: auth.isAuth(req, res, next)
        });
    });
}

// Renderiza la página que contiene el panel de administrador.
exports.getAdminPanelPage = (req, res, next) => {
    res.render('admin/admin-panel');
}