// Importa modelo de BD
const brand = require('../models/dao-brand');

const { validationResult } = require('express-validator');

// Renderiza página con lista de marcas.
exports.getBrandsPage = (req, res, next) => {
    brand.listBrands().then(listBrands => {
        res.render('admin/brands', {
            brands: listBrands,
            pageTitle: 'Marcas'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Renderiza página para agregar marcas.
exports.getBrandAddPage = (req, res, next) => {
    res.render('admin/brand-add', {
        pageTitle: 'Agregar marca'
    });
}

// Renderiza página para editar marcas.
exports.getBrandEditPage = (req, res, next) => {
    const id = req.query.id;

    brand.findById(id).then(result => {
        res.render('admin/brand-add', {
            listBrand: result,
            pageTitle: 'Editar marca',
            status: 'editing'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Renderiza página para eliminar marcas. 
exports.getBrandDeletePage = (req, res, next) => {
    const id = req.query.id;

    brand.findById(id).then(result => {
        res.render('admin/brand-add', {
            listBrand: result, 
            pageTitle: 'Confirmación', 
            status: 'deleting'
        })
    });
}

// Renderiza página para buscar marcas.
exports.getSearchBrand = (req, res, next) => {
    const search = req.query.search;
    
    brand.searchBrand(search).then(result => {
        res.render('admin/brands', {
            brands: result,
            pageTitle: 'Búsqueda',
            status: 'searching'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Agrega una marca.
exports.postAddBrand = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/brand-add', {
            pageTitle: 'Agregar marca',
            errorMessages: errors.array()
        });
    } else {
        const name = req.body.name;

        brand.createBrand(name).then(result => {
            res.redirect('/admin/brands#brands-list');
        }).catch(err => {
            console.log(err);
        });
    }
}

// Edita una marca.
exports.postEditBrand = (req, res, next) => {
    const idQuery = req.query.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        brand.findById(idQuery).then(brand => {
            return res.status(422).render('admin/brand-add', {
                pageTitle: 'Editar marca',
                listBrand: brand,
                status: 'editing',
                errorMessages: errors.array()
            });
        });
    } else {
        const name = req.body.name;
        brand.updateBrand(idQuery, name).then(result => {
            res.redirect('/admin/brands#brands-list');
        }).catch(err => {
            console.log(err);
        });
    }
}

// Elimina una marca.
exports.postDeleteBrand = (req, res, next) => {
    const id = req.body.id;

    brand.deleteBrand(id).then(result => {
        res.redirect('/admin/brands#brands-list');
    }).catch(err => {
        console.log(err);
    });
}

// Envía un array que contiene la lista de todas las marcas.
exports.getBrandsOnly = (req, res, next) => {
    brand.listBrands().then(listBrands => {
        res.send( { listBrands } );
    })
}

// Ordena ID's de forma ascendiente
exports.orderByIdAsc = (req, res, next) => {
    brand.orderByIdAsc().then(listBrands => {
        res.send( { listBrands } );
    }).catch(err => {
        console.log(err);
    })
}

// Ordena ID's de forma descendiente
exports.orderByIdDesc = (req, res, next) => {
    brand.orderByIdDesc().then(listBrands => {
        res.send( { listBrands } );
    }).catch(err => {
        console.log(err);
    })
}

// Ordena por nombre
exports.orderByName = (req, res, next) => {
    brand.orderByName().then(listBrands => {
        res.send( { listBrands } );
    }).catch(err => {
        console.log(err);
    })
}