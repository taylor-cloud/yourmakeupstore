const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

const userController = require('../controllers/users');

// Rutas de módulo usuarios

router.get('/users', auth.checkAuthentication, userController.getUsersPage);

router.get('/user-search', auth.checkAuthentication, userController.getSearchUser);

// Ordenar por 

router.get('/users/orderByIdAsc', auth.checkAuthentication, userController.orderByIdAsc);

router.get('/users/orderByIdDesc', auth.checkAuthentication, userController.orderByIdDesc);

router.get('/users/orderByName', auth.checkAuthentication, userController.orderByName);

router.get('/users/orderByLastname', auth.checkAuthentication, userController.orderByLastname);

router.get('/users/orderByDateAsc', auth.checkAuthentication, userController.orderByDateAsc);

router.get('/users/orderByDateDesc', auth.checkAuthentication, userController.orderByDateDesc);

module.exports = router;