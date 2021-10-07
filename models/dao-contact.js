const db = require('../models');

// Véase ../controllers/users.js

// Lista todos los contactos.
exports.listContacts = () => {
    return db.Contact.findAll();
}

// Crea un contacto. Recibe los parámetros para la creación de un contacto y retorna una promesa.
exports.createContact = (cellphone) => {
    return db.Contact.create({
        contactCellphone: cellphone
    });
}

// Busca un contacto por id. Recibe el id del contacto a ser buscado y retorna una promesa.
exports.findByIdContact = (id) => {
    return db.Contact.findAll({
        where: {
            idContact: id
        }
    });
}

// Actualiza un contacto. Recibe los parámetros a ser actualizados y retorna una promesa.
exports.updateContact = (id, cellphone) => {
    return db.Contact.update({
        contactCellphone: cellphone
    }, {
        where: {
            idContact: id
        }
    });
}