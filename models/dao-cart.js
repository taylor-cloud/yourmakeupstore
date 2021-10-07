const db = require('../models');

// Véase ../controllers/users.js
// Véase ../controllers/carts.js

// Busca un carro según el id del usuario. Recibe como parámetro el id del usuario y retorna una promesa.
exports.findCartByIdUser = (idUser) => {
    return db.Cart.findAll({
        where: {
            userIdUser: idUser
        }
    });
}

// Crea un carro correspondiente a un usuario. Recibe como parámetro el id del usuario y retorna una promesa.
exports.createCart = (idUser) => {
    return db.Cart.create({
        userIdUser: idUser
    });
}