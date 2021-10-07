const db = require('../models');

// Véase ../controllers/users.js

// Lista todas las personas. Retorna una promesa.
exports.listPersons = () => {
    return db.Person.findAll();
}

exports.listPersonAddress = (idUser) => {
    return db.Person.findAll({
        where: {
            userIdUser: idUser
        },

        include: [
            { model: db.Address, as: 'address' }
        ]
    });
}

exports.listPerson = (idUser) => {
    return db.Person.findAll({
        where: {
            userIdUser: idUser
        },

        include: [
            { model: db.Contact, as: 'contact' },
            { model: db.Address, as: 'address' }
        ]
    });
}

// Crea una persona. Recibe los parámetros a ser registrados y retorna una promesa.
exports.createPerson = (name, lastname, idUser, idContact, idAddress) => {
    return db.Person.create({
        personName: name,
        personLastname: lastname,
        userIdUser: idUser,
        contactIdContact: idContact,
        addressIdAddress: idAddress
    });
}

// Busca una persona por id. Recibe como parámetro el id de la persona y retorna una promesa.
exports.findByIdPerson = (id) => {
    return db.Person.findAll({
        where: {
            idPerson: id
        }
    });
}

// Actualiza una persona. Recibe como parámetro los datos a ser actualizados y retorna una promesa.
exports.updatePerson = (id, name, lastname, idUser, idContact, idAddress) => {
    return db.Person.update({
        personName: name,
        personLastname: lastname,
        userIdUser: idUser, 
        contactIdContact: idContact,
        addressIdAddress: idAddress
    }, {
        where: {
            idPerson: id
        }
    });
}