const db = require('../models');
const Op = db.Op

// Véase ../controllers/users.js

// Lista todos los usuarios. Retorna una promesa.
exports.listUsers = () => {
    return db.User.findAll({
        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Crea un usuario. Recibe los parámetros a ser registrados y retorna una promesa.
exports.createUser = (email, pass) => {
    return db.User.create({
        userEmail: email,
        userPassword: pass,
        userRol: 2
    });
}

// Busca un usuario por id. Recibe la id a ser buscada y retorna una promesa.
exports.findByIdUser = (id) => {
    return db.User.findAll({
        where: {
            idUser: id
        }
    });
}

// Busca un usuario por email. Recibe el email a ser buscado y retorna una promesa.
exports.findByEmail = (email) => {
    return db.User.findAll({
        where: {
            userEmail: email
        }
    });
}

// Busca un usuario por id o email. Recibe el parámetro a ser buscado y retorna una promesa.
exports.searchUser = (search) => {
    return db.User.findAll({
        where: {
            [Op.or]: [
                {
                    idUser: {
                        [Op.like]: '%'+search+'%'
                    }
                },
                {
                    userEmail: {
                        [Op.like]: '%'+search+'%'
                    }
                }
            ]
        },
        
        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Actualiza un usuario. Recibe los parámetros a ser modificados y retorna una promesa.
exports.updateUser = (id, email, pass) => {
    return db.User.update({
        userEmail: email,
        userPassword: pass
    }, {
        where: {
            idUser: id
        }
    });
}

// Ordena id de usuario de forma ascendiente. Retorna una promesa.
exports.orderByIdAsc = () => {
    return db.User.findAll({
        order: [
            ['idUser', 'ASC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Ordena id de usuario de forma descendiente. Retorna una promesa.
exports.orderByIdDesc = () => {
    return db.User.findAll({
        order: [
            ['idUser', 'DESC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Ordena usuarios por nombre. Retorna una promesa.
exports.orderByName = () => {
    return db.User.findAll({
        order: [
            ['person', 'personName', 'ASC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Ordena usuarios por apellido. Retorna una promesa.
exports.orderByLastname = () => {
    return db.User.findAll({
        order: [
            ['person', 'personLastname', 'ASC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Ordena usuarios por fecha de creación de forma ascendiente. Retorna una promesa.
exports.orderByDateDesc = () => {
    return db.User.findAll({
        order: [
            ['createdAt', 'ASC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}

// Ordena usuarios por fecha de creación de forma descendiente. Retorna una promesa.
exports.orderByDateAsc = () => {
    return db.User.findAll({
        order: [
            ['createdAt', 'DESC']
        ],

        include: [
            { model: db.Person, as: 'person' }
        ]
    });
}