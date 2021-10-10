const product = require('../models/dao-product');
const auth = require('./auth');
const { validationResult } = require('express-validator');

// ------- Cliente -------

// Renderiza la página con la lista de productos.
exports.getProductsList = (req, res, next) => {
    if (req.query.category !== undefined) {
        const id = req.query.category;
        product.findByIdCategory(id).then(listProducts => {
            res.render('user/prod-list', {
                products: listProducts,
                isAuth: auth.isAuth(req, res, next),
                pageTitle: 'Productos'
            });
        });
    } else {
        const id = req.query.id;
        product.findByIdSubcategory(id).then(listProducts => {
            res.render('user/prod-list', {
                products: listProducts,
                isAuth: auth.isAuth(req, res, next),
                pageTitle: 'Productos'
            });
        });
    }
}

// Renderiza la página con el detalle de un producto.
exports.getProductDetailPage = (req, res, next) => {
    const id = req.query.product;
    product.findByIdProduct(id).then(result => {
        res.render('user/product-detail', {
            products: result,
            isAuth: auth.isAuth(req, res, next)
        });
    });
}

exports.getProductSearchUser = (req, res, next) => {
    const search = req.query.search;

    product.searchProduct(search).then(result => {
        console.log(result);
        res.render('user/prod-list', {
            products: result,
            pageTitle: 'Búsqueda'
        });
    }).catch(err => {
        console.log(err);
    });
}
// ------- Administrador -------

// Renderiza la página de lista de productos.
exports.getProductsPage = (req, res, next) => {
    product.listProducts().then(listProducts => {
        res.render('admin/products', {
            products: listProducts,
            pageTitle: 'Productos'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Renderiza la página para agregar productos.
exports.getProductAddPage = (req, res, next) => {
    res.render('admin/product-add', {
        pageTitle: 'Agregar producto'
    });
}

// Renderiza la página para editar productos.
exports.getProductEditPage = (req, res, next) => {
    const id = req.query.id;
    
    product.findByIdProduct(id).then(product => {
        res.render('admin/product-add', {
            listProduct: product,
            pageTitle: 'Editar producto',
            status: 'editing'
        });

    }).catch(err => {
        console.log(err);
    });
}

// Renderiza la página para eliminar productos.
exports.getProductDeletePage = (req, res, next) => {
    const id = req.query.id;

    product.findByIdProduct(id).then(product => {
        res.render('admin/product-add', {
            listProduct: product,
            pageTitle: 'Eliminar producto', 
            status: 'deleting'
        });

    }).catch(err => {
        console.log(err);
    });
}

// Renderiza la página de búsqueda de productos.
exports.getProductSearch = (req, res, next) => {
    const search = req.query.search;

    product.searchProduct(search).then(result => {
        res.render('admin/products', {
            products: result,
            pageTitle: 'Búsqueda',
            status: 'searching'
        });
    }).catch(err => {
        console.log(err);
    });
}

// Agrega un producto.
exports.postAddProduct = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/product-add', {
            pageTitle: 'Agregar producto',
            errorMessages: errors.array()
        });
    } else {
        const name = req.body.name;
        const price = req.body.price;
        const brand = req.body.brand;
        const stock = req.body.stock;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const description = req.body.description;
        const image = '/img/uploads/'+req.file.filename;

        product.createProduct(name, price, brand, stock, category, subcategory, description, image).then(result => {
            res.redirect('/admin/products#products-list');
        }).catch(err => {
            console.log(err);
        });
    }
}

// Edita un producto.
exports.postEditProduct = (req, res, next) => {
    const idQuery = req.query.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        product.findByIdProduct(idQuery).then(product => {
            return res.status(422).render('admin/product-add', {
                pageTitle: 'Agregar producto',
                listProduct: product, 
                status: 'editing',
                errorMessages: errors.array()
            });
        });
    } else {
        const name = req.body.name;
        const price = req.body.price;
        const brand = req.body.brand;
        const stock = req.body.stock;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const description = req.body.description;

        product.updateProduct(name, price, brand, stock, category, subcategory, description, idQuery).then(result => {
            res.redirect('/admin/products#products-list');
        }).catch(err => {
            console.log(err);
        });
    }
}

// Elimina un producto.
exports.postDeleteProduct = (req, res, next) => {
    const id = req.query.id;

    product.deleteProduct(id).then(result => {
        res.redirect('/admin/products#products-list');
    }).catch(err => {
        console.log(err);
    });
}

// Ordenar por

// Ordena ID's de forma ascendiente.
exports.orderByIdAsc = (req, res, next) => {
    product.orderByIdAsc().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena ID's de forma descendiente.
exports.orderByIdDesc = (req, res, next) => {
    product.orderByIdDesc().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por nombre.
exports.orderByName = (req, res, next) => {
    product.orderByName().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por precio ascendiente.
exports.orderByPriceAsc = (req, res, next) => {
    product.orderByPriceAsc().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por precio descendiente.
exports.orderByPriceDesc = (req, res, next) => {
    product.orderByPriceDesc().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por stock.
exports.orderByStock = (req, res, next) => {
    product.orderByStock().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por marca.
exports.orderByBrand = (req, res, next) => {
    product.orderByBrand().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por categoría.
exports.orderByCategory = (req, res, next) => {
    product.orderByCategory().then(listProducts => {
        res.send( { listProducts } );
    });
}

// Ordena por subcategoría.
exports.orderBySubcategory = (req, res, next) => {
    product.orderBySubcategory().then(listProducts => {
        res.send( { listProducts } );
    });
}