const category = require('../models/dao-category');

// Renderiza la página que lista las categorías.
exports.getCategoriesPage = (req, res, next) => {
    category.listCategories().then(listCategories => {
        res.render('admin/categories', {
            categories: listCategories,
            pageTitle: 'Categorías'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Envía un array que tiene la lista de todas las categorías.
exports.getCategoriesOnly = (req, res, next) => {
    category.listCategories().then(listCategories => {
        res.send( { listCategories } );
    });
}

// Ordena ID's de forma ascendiente.
exports.orderByIdAsc = (req, res, next) => {
    category.orderByIdAsc().then(listCategories => {
        res.send( { listCategories } );
    });
}

// Ordena ID's de forma descendiente.
exports.orderByIdDesc = (req, res, next) => {
    category.orderByIdDesc().then(listCategories => {
        res.send( { listCategories } );
    });
}

// Ordena por nombre.
exports.orderByName = (req, res, next) => {
    category.orderByName().then(listCategories => {
        res.send( { listCategories } );
    });
}