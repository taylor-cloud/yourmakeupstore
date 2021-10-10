const db = require('../models');
const Op = db.Op;

// Véase ../controllers/brands.js

// Lista todas las marcas. Retorna una promesa.
exports.listBrands = () => {
    return db.Brand.findAll();
}

// Crea una nueva marca. Recibe como parámetro el nombre de la marca y retorna una promesa.
exports.createBrand = (name) => {
    return db.Brand.create({
        brandName: name
    });
}

// Busca una marca por id. Recibe como parámetro el id a ser buscado y retorna una promesa.
exports.findById = (id) => {
    return db.Brand.findAll({
        where: {
            idBrand: id
        }
    });
}

// Actualiza una marca. Recibe como parámetro los datos a ser actualizados y retorna una promesa.
exports.updateBrand = (id, name) => {
    return db.Brand.update({ 
        brandName: name 
    }, { 
        where: { idBrand: id } 
    });
}

// Elimina una marca. Recibe como parámetro el id de la marca a ser eliminado y retorna una promesa.
exports.deleteBrand = (id) => {
    return db.Brand.destroy({
        where: {
            idBrand: id
        },
        force: true
    });
}

// Busca una marca por id o nombre. Recibe como parámetro el id de la marca y retorna una promesa.
exports.searchBrand = (search) => {
    return db.Brand.findAll({
        where: {
            [Op.or]: [
                {
                    idBrand: {
                        [Op.like]: '%'+search+'%'
                    }
                },
                {
                    brandName: {
                        [Op.like]: '%'+search+'%'
                    }
                }
            ]
        }
    });
}

// Ordena id de marcas en forma ascendiente. Retorna una promesa.
exports.orderByIdAsc = () => {
    return db.Brand.findAll({
        order: [
            ['idBrand', 'ASC']
        ]
    });
}

// Ordena id de marcas en forma descendiente. Retorna una promesa.
exports.orderByIdDesc = () => {
    return db.Brand.findAll({
        order: [
            ['idBrand', 'DESC']
        ]
    });
}

// Ordena marcas por nombre. Retorna una promesa.
exports.orderByName = () => {
    return db.Brand.findAll({
        order: [
            ['brandName', 'ASC']
        ]
    });
}