const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const { body } = require('express-validator');

// Controlador
const userController = require('../controllers/users');

// Validación
const validator = [

    // Nombre
    body('name').notEmpty().withMessage('Debe ingresar un nombre. '),
    body('name').isAlpha().withMessage('Debe ingresar un nombre válido. '),

    // Apellido
    body('lastname').notEmpty().withMessage('Debe ingresar un apellido. '),
    body('lastname').isAlpha().withMessage('Debe ingresar un apellido válido. '),

    // Email
    body('email').notEmpty().withMessage('Debe ingresar un email. '),
    body('email').isEmail().withMessage('Debe ingresar un email válido. '),

    // Contraseña
    body('password').notEmpty().withMessage('Debe ingresar una contraseña'),
    body('password').isLength( { min: 6 } ).withMessage('La contraseña debe tener como mínimo 6 caracteres. '),

    // Confirmar contraseña
    body('repeat-password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden. Intentelo de nuevo.');
        } else {
            return true;
        }
    }),

    // Celular
    body('cellphone').notEmpty().withMessage('Debe ingresar un número de celular. '),
    body('cellphone').isNumeric().withMessage('Debe digitar números en el campo Celular. '),
    body('cellphone').isLength( { min: 9, max: 9 } ).withMessage('El celular debe contener nueve dígitos. '),

    // Región
    body('region').isNumeric().withMessage('Debe ingresar una región. '),

    // Provincia
    body('provincia').isNumeric().withMessage('Debe ingresar una provincia. '),

    // Comuna
    body('comuna').isNumeric().withMessage('Debe ingresar una comuna. '),

    // Calle
    body('street').notEmpty().withMessage('Debe ingresar una calle. '),
    body('street').isString().withMessage('Debe ingresar una calle válida. '),

    // Número dirección
    body('addressNumber').notEmpty().withMessage('Debe ingresar un número de dirección. '),
    body('addressNumber').isNumeric().withMessage('Debe digitar sólo números en el número de la dirección. ')
];

// POST

router.post('/add-user', validator, userController.postAddPerson);

router.post('/auth', userController.loginUser);

// Iniciar Sesión

router.get('/sign-in', auth.checkNoAuthentication, userController.getSignInPage);

router.get('/logout', auth.logout);

// Registrarse

router.get('/sign-up', auth.checkNoAuthentication, userController.getRegisterPage);

router.get('/get-regiones', userController.getRegiones);

router.get('/get-provincias/:id', userController.getProvincias);

router.get('/get-comunas/:id', userController.getComunas);

module.exports = router;