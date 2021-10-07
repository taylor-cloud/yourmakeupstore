// Librería para autenticación.
const passport = require('passport');

// Librería para encriptar contraseñas.
const bcrypt = require('bcrypt');

// Modelos BD requeridos.
const user = require("../models/dao-user");
const address = require("../models/dao-address");
const contact = require("../models/dao-contact");
const person = require("../models/dao-person");
const region = require("../models/dao-region");
const provincia = require("../models/dao-provincia");
const comuna = require("../models/dao-comuna");
const cart = require('../models/dao-cart');

const { validationResult } = require('express-validator');

// Autentica usuario.
exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'sign-in',
    failureFlash: true
});

// Busca un usuario por su email.
const findByEmail = (req, res, next) => {
    const email = req.body.email;

    return user.findByEmail(email);
}

// Agrega un usuario.
const addUser = async (req, res, next) => {
    const email = req.body.email;

    // Encripta la contraseña.
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    return user.createUser(email, hashedPass);
}

// Agrega una dirección.
const addAddress = (req, res, next) => {
    const street = req.body.street;
    const number = req.body.addressNumber;
    const depNumber = req.body.departmentNumber;
    const idRegion = req.body.region;
    const idProvincia = req.body.provincia;
    const idComuna = req.body.comuna;

    return address.createAddress(street, number, depNumber, idRegion, idProvincia, idComuna);
}

// Agrega un contacto.
const addContact = (req, res, next) => {
    const cellphone = req.body.cellphone;

    return contact.createContact(cellphone);
}

// Agrega un carro para el usuario registrado (idUser)
const addUserCart = (req, res, next, idUser) => {
    return cart.createCart(idUser);
}

// ------- Cliente -------

// Renderiza la página de registro de usuarios.
exports.getRegisterPage = (req, res, next) => {
    res.render('user/form-reg', {
        pageTitle: 'Crear una cuenta'
    });
}

// Renderiza la página de inicio de sesión de usuarios.
exports.getSignInPage = (req, res, next) => {
    res.render('user/form-inicio', {
        pageTitle: 'Iniciar sesión'
    });
}

// Agrega un usuario nuevo.
exports.postAddPerson = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('user/form-reg', {
            pageTitle: 'Crear una cuenta',
            errorMessages: errors.array()
        })
    } else {

        // Revisa si el usuario existe.
        findByEmail(req, res, next).then(result => {

            // Si no existe, se procede a registrar un nuevo usuario.
            if (result.length == 0) {

                // Añade usuario
                addUser(req, res, next).then(user => {

                    // Añade dirección
                    addAddress(req, res, next).then(address => {

                        // Añade contacto
                        addContact(req, res, next).then(contact => {
                            const name = req.body.name;
                            const lastname = req.body.lastname;

                            // La propiedad dataValues es para obtener el valor de los campos recién insertados.
                            const idUser = user.dataValues.idUser;
                            const idContact = contact.dataValues.idContact;
                            const idAddress = address.dataValues.idAddress;
                            
                            // Crea carrito que pertenece al usuario creado.
                            addUserCart(req, res, next, idUser).then(cart => {
                                
                                // Crea una persona.
                                person.createPerson(name, lastname, idUser, idContact, idAddress).then(person => {
                                    res.redirect('/user/sign-in');
                                });
                            });
                        });
                    });
                }).catch(err => {
                    console.log(err);
                });

            } else {
                console.log('El usuario ya se encuentra registrado. ');
            }
        });
    }
}

// Envía un array que contiene la lista de todas las regiones.
exports.getRegiones = (req, res, next) => {
    region.listRegions().then(listRegiones => {
        res.send( { listRegiones } );
    });
}

// Envía un array que contiene una lista de provincias según región.
exports.getProvincias = (req, res, next) => {
    const id = req.params.id;

    provincia.findByIdRegion(id).then(listProvincias => {
        res.send( { listProvincias } );
    });
}

// Envía un array que contiene una lista de comunas según provincia.
exports.getComunas = (req, res, next) => {
    const id = req.params.id;

    comuna.findByIdProvincia(id).then(listComunas => {
        res.send( { listComunas } );
    });
}

// ------- Administrador -------

// Renderiza la página con lista de usuarios.
exports.getUsersPage = (req, res, next) => {
    user.listUsers().then(listUsers => {
        res.render('admin/users', {
            users: listUsers,
            pageTitle: 'Usuarios'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Renderiza la página de búsqueda de usuarios.
exports.getSearchUser = (req, res, next) => {
    const search = req.query.search;
    
    user.searchUser(search).then(result => {
        res.render('admin/users', {
            users: result,
            pageTitle: 'Búsqueda',
            status: 'searching'
        });
        
    }).catch(err => {
        console.log(err);
    });
}

// Ordenar por

// Ordena ID's de forma ascendiente.
exports.orderByIdAsc = (req, res, next) => {
    user.orderByIdAsc().then(listUsers => {
        res.send( { listUsers } );
    });
}

// Ordena ID's de forma descendiente.
exports.orderByIdDesc = (req, res, next) => {
    user.orderByIdDesc().then(listUsers => {
        res.send( { listUsers } );
    });
}

// Ordena por nombre.
exports.orderByName = (req, res, next) => {
    user.orderByName().then(listUsers => {
        res.send( { listUsers } );
    });
}

// Ordena por apellido.
exports.orderByLastname = (req, res, next) => {
    user.orderByLastname().then(listUsers => {
        res.send( { listUsers } );
    });
}

// Ordena por fecha ascendiente.
exports.orderByDateAsc = (req, res, next) => {
    user.orderByDateAsc().then(listUsers => {
        res.send( { listUsers } );
    });
}

// Ordena por fecha descendiente.
exports.orderByDateDesc = (req, res, next) => {
    user.orderByDateDesc().then(listUsers => {
        res.send( { listUsers } );
    });
}