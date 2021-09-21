
// Módulos NodeJS
const path = require('path');

// Módulos externos
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./util/passport-config');

initializePassport(passport);

const db = require('./models');

// Manejador Paths
const rootDir = require('./util/path');

// Llamando a Express
const app = express();

// Usando templating engine pug
app.set('view engine', 'pug');
// Indicando a pug dónde están las vistas
app.set('views', 'views');

// Usando body-parser para recuperar data de un html
app.use(bodyParser.urlencoded({ extended: false }));

// Usando archivos estáticos para front
app.use(express.static(path.join(rootDir, 'public')));

// Autenticación
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Manejadores de rutas
const shopRoutes = require('./routes/shop');
const shopSubcategories = require('./routes/subcategories');
const adminRoutes = require('./routes/admin-shop');
const shopProducts = require('./routes/products');

const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');
const checkoutRoutes = require('./routes/checkouts');

const adminUserRoutes = require('./routes/admin-users');
const adminProducts = require('./routes/admin-products');
const adminBrands = require('./routes/admin-brands');
const adminCategories = require('./routes/admin-categories');
const adminSubcategories = require('./routes/admin-subcategories');
const adminOrders = require('./routes/admin-orders');

// Indicando rutas
app.use('/', shopRoutes);
app.use('/', shopSubcategories);
app.use('/admin', adminRoutes);
app.use('/productos', shopProducts);

// Usuario
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes)

// Admin
app.use('/admin', adminUserRoutes);
app.use('/admin', adminProducts)
app.use('/admin', adminBrands);
app.use('/admin', adminCategories);
app.use('/admin', adminSubcategories);
app.use('/admin', adminOrders);


// Iniciar sequelize
// { force: true } borra y rehace toda la base de datos.
db.sequelize.sync().then(result => {
    // console.log(result);
    app.listen(3000);
}).catch(err => {
    console.log(err);
});