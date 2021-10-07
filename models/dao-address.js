const db = require('../models');

// Véase ../controllers/users.js

// Lista todas las direcciones. Retorna una promesa.
exports.listAddresses = () => {
    return db.Address.findAll();
}

// Crea una dirección. Recibe como parámetros los datos a ser registrados y retorna una promesa.
exports.createAddress = (street, number, department, idRegion, idProvincia, idComuna) => {
    
    return db.Address.create({
        addressStreet: street,
        addressNumber: number, 
        addressDepartment: department,
        regioneIdRegion: idRegion,
        provinciaIdProvincia: idProvincia,
        comunaIdComuna: idComuna
    });
}

// Busca una dirección por id. Recibe como parámetro la id a ser buscada y retorna una promesa.
exports.findByIdAddress = (id) => {
    return db.Address.findAll({
        where: {
            idAddress: id
        },
        include: [
            { model: db.Region, as: 'region' },
            { model: db.Provincia, as: 'provincia' },
            { model: db.Comuna, as: 'comuna' }
        ]
    });
}

// Actualiza una dirección. Recibe como parámetro los datos a ser actualizados y retorna una promesa.
exports.updateAddress = (id, street, number, department, idRegion, idProvincia, idComuna) => {
    return db.Address.update({
        addressStreet: street,
        addressNumber: number,
        addressDepartment: department,
        regioneIdRegion: idRegion,
        provinciaIdProvincia: idProvincia,
        comunaIdComuna: idComuna
    }, {
        where: { 
            idSubcategory: id 
        }
    });
}