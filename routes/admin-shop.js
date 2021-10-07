const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

const adminController = require('../controllers/admin-shop');

// Rutas de módulo shop

router.get('/dashboard', auth.checkAuthentication, adminController.getDashboardPage);

module.exports = router;