const db = require('../models');

// Véase ../controllers/users.js

// Lista todas las comunas.
exports.listComunas = () => {
    return db.Comuna.findAll();
}

// Lista todas las comunas que pertenezcan a una determinada provincia. Recibe el id de la provincia y retorna una promesa.
exports.findByIdProvincia = (idProvincia) => {
    return db.Comuna.findAll({
        where: {
            provinciaIdProvincia: idProvincia
        }
    });
}