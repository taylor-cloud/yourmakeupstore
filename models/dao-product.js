const db = require('../models');
const Op = db.Op

// Véase ../controllers/products.js
// Véase ../controllers/shop.js

// Lista todos los productos. Retorna una promesa.
exports.listProducts = () => {
    return db.Product.findAll({
        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Busca un producto por id. Recibe como parámetro el id a ser buscado y retorna una promesa.
exports.findByIdProduct = (id) => {
    return db.Product.findAll({
        where: {
            idProduct: id
        },
        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Busca un producto por id de subcategoría. Recibe como parámetro el id a ser buscado y retorna una promesa.
exports.findByIdSubcategory = (id) => {
    return db.Product.findAll({
        where: {
            subcategoryIdSubcategory: id
        },
        include: [
            { model: db.Brand, as: 'brand' }
        ]
    });
}

// Busca un producto por id de categoría. Recibe como parámetro el id a ser buscado y retorna una promesa.
exports.findByIdCategory = (id) => {
    return db.Product.findAll({
        where: {
            categoryIdCategory: id
        },
        include: [
            { model: db.Brand, as: 'brand' }
        ]
    });
}

// Busca un producto por id o nombre. Recibe como parámetro el criterio de búsqueda y retorna una promesa.
exports.searchProduct = (search) => {
    return db.Product.findAll({
        where: {
            [Op.or]: [
                {
                    idProduct: {
                        [Op.like]: '%'+search+'%'
                    }
                },
                {
                    productName: {
                        [Op.like]: '%'+search+'%'
                    }
                }
            ]
        },

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Crea un producto. Recibe como parámetros los datos a ser registrados y retorna una promesa.
exports.createProduct = (name, price, brand, stock, category, subcategory, description, image) => {
    return db.Product.create({
        productName: name,
        productPrice: price,
        productStock: stock,
        productDescription: description,
        productImgurl: image,
        categoryIdCategory: category,
        subcategoryIdSubcategory: subcategory,
        brandIdBrand: brand
    });
}

// Modifica un producto. Recibe como parámetros los datos a ser actualizados y retorna una promesa.
exports.updateProduct = (name, price, brand, stock, category, subcategory, description, id) => {
    return db.Product.update({
        productName: name,
        productPrice: price,
        brandIdBrand: brand,
        productStock: stock,
        categoryIdCategory: category,
        subcategoryIdSubcategory: subcategory,
        productDescription: description
    }, {
        where: {
            idProduct: id
        }
    });
}

// Elimina un producto por id. Recibe como parámetro el id del producto a ser eliminado y retorna una promesa.
exports.deleteProduct = (id) => {
    return db.Product.destroy({
        where: {
            idProduct: id
        },
        force: true
    });
}

// Lista seis nuevos productos. Retorna una promesa.
exports.getNewProducts = () => {
    return db.Product.findAll({
        limit: 6,

        order: [
            ['createdAt', 'DESC']
        ],

        include: [
            { model: db.Brand, as: 'brand' },
        ]
    });
}

// Ordena id de productos de forma ascendiente. Retorna una promesa.
exports.orderByIdAsc = (search) => {
    return db.Product.findAll({
        order: [
            ['idProduct', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena id de productos de forma descendiente. Retorna una promesa.
exports.orderByIdDesc = () => {
    return db.Product.findAll({
        order: [
            ['idProduct', 'DESC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por nombre. Retorna una promesa.
exports.orderByName = () => {
    return db.Product.findAll({
        order: [
            ['productName', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por precio ascendiente. Retorna una promesa.
exports.orderByPriceAsc = () => {
    return db.Product.findAll({
        order: [
            ['productPrice', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por precio descendiente. Retorna una promesa.
exports.orderByPriceDesc = () => {
    return db.Product.findAll({
        order: [
            ['productPrice', 'DESC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por stock ascendiente. Retorna una promesa.
exports.orderByStock = () => {
    return db.Product.findAll({
        order: [
            ['productStock', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por marca. Retorna una promesa.
exports.orderByBrand = () => {
    return db.Product.findAll({
        order: [
            ['brand', 'brandName', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por categoría. Retorna una promesa.
exports.orderByCategory = () => {
    return db.Product.findAll({
        order: [
            ['category', 'categoryName', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}

// Ordena productos por subcategoría. Retorna una promesa.
exports.orderBySubcategory = () => {
    return db.Product.findAll({
        order: [
            ['subcategory', 'subcategoryName', 'ASC']
        ],

        include: [
            { model: db.Subcategory, as: 'subcategory' },
            { model: db.Brand, as: 'brand' },
            { model: db.Category, as: 'category' }
        ]
    });
}