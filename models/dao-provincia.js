const db = require('../models');

// Véase ../controllers/users.js

// Lista todas las provincias. Retorna una promesa.
exports.listProvincias = () => {
    return db.Provincia.findAll();
}

// Busca provincias por id de región. Recibe como parámetro el id de la región y retorna una promesa.
exports.findByIdRegion = (idRegion) => {
    return db.Provincia.findAll({
        where: {
            regioneIdRegion: idRegion
        }
    });
}