const db = require('../models');
const Op = db.Op

// Véase ../controllers/categories.js
// Véase ../controllers/productos.js

// Lista todas las categorías. Retorna una promesa.
exports.listCategories = () => {
    return db.Category.findAll();
}

// Busca una categoría según id o nombre. Recibe id o nombre de categoría y retorna una promesa.
exports.searchCategory = (search) => {
    return db.Category.findAll({
        where: {
            [Op.or]: [
                {
                    idCategory: {
                        [Op.like]: '%'+search+'%'
                    }
                },
                {
                    categoryName: {
                        [Op.like]: '%'+search+'%'
                    }
                }
            ]
        }
    });
}

exports.orderByIdAsc = () => {
    return db.Category.findAll({
        order: [
            ['idCategory', 'ASC']
        ]
    });
}

exports.orderByIdDesc = () => {
    return db.Category.findAll({
        order: [
            ['idCategory', 'DESC']
        ]
    });
}

exports.orderByName = () => {
    return db.Category.findAll({
        order: [
            ['categoryName', 'ASC']
        ]
    });
}