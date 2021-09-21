const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');
const Op = Sequelize.Op;

// Importando modelos de la base de datos.
const user = require('./user');
const person = require('./person');
const contact = require('./contact');
const address = require('./address');
const product = require('./product');
const brand = require('./brand');
const category = require('./category');
const subcategory = require('./subcategory');
const comuna = require('./comuna');
const provincia = require('./provincia');
const region = require('./region');
const cart = require('./cart');
const cartitem = require('./cart-item');
const order = require('./order');

// Objeto para inicializar sequelize.
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Op: Op,

    // Definir modelos de la base de datos.
    User: user(sequelize, Sequelize.DataTypes),
    Contact: contact(sequelize, Sequelize.DataTypes),
    Address: address(sequelize, Sequelize.DataTypes),
    Product: product(sequelize, Sequelize.DataTypes),
    Brand: brand(sequelize, Sequelize.DataTypes),
    Category: category(sequelize, Sequelize.DataTypes),
    Subcategory: subcategory(sequelize, Sequelize.DataTypes),
    Region: region(sequelize, Sequelize.DataTypes),
    Provincia: provincia(sequelize, Sequelize.DataTypes),
    Comuna: comuna(sequelize, Sequelize.DataTypes),
    Person: person(sequelize, Sequelize.DataTypes),
    Cart: cart(sequelize, Sequelize.DataTypes),
    CartItem: cartitem(sequelize, Sequelize.DataTypes),
    Order: order(sequelize, Sequelize.DataTypes)
};

// -------- Relaciones --------

// Relaciones categorías
db.Category.hasMany(db.Subcategory, { onDelete: 'cascade' , hooks: true});
db.Subcategory.belongsTo(db.Category);

// Relaciones productos
db.Subcategory.hasMany(db.Product, { onDelete: 'cascade' , hooks: true});
db.Product.belongsTo(db.Subcategory);
db.Brand.hasMany(db.Product, { onDelete: 'cascade' , hooks: true});
db.Product.belongsTo(db.Brand);
db.Product.belongsTo(db.Category);

// Relaciones ubicacion
db.Region.hasMany(db.Provincia);
db.Provincia.belongsTo(db.Region);
db.Provincia.hasMany(db.Comuna);
db.Comuna.belongsTo(db.Provincia);

// Usuarios
db.User.hasOne(db.Person);
db.Person.belongsTo(db.User);
db.Contact.hasOne(db.Person);
db.Person.belongsTo(db.Contact);
db.Address.hasOne(db.Person);
db.Person.belongsTo(db.Address);

// Region, provincia, comuna
db.Region.hasOne(db.Address);
db.Provincia.hasOne(db.Address);
db.Comuna.hasOne(db.Address);

// Carrito 
db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User);

db.Cart.hasMany(db.CartItem);
db.CartItem.belongsTo(db.Cart);

db.Product.hasMany(db.CartItem, { onDelete: 'cascade' , hooks: true});
db.CartItem.belongsTo(db.Product);

// Órdenes
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

db.Contact.hasMany(db.Order);
db.Order.belongsTo(db.User);

db.Address.hasMany(db.Order);
db.Order.belongsTo(db.User);

db.Cart.hasOne(db.Order);
db.Order.belongsTo(db.Cart);

module.exports = db;