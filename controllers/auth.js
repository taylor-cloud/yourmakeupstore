// Verifica si el usuario está autenticado.
exports.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('user/form-inicio', {
            messageAuth: 'Para acceder a esta página, debes iniciar sesión. '
        });
    }
}

// Verifica si el usuario no está autenticado.
exports.checkNoAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('user/index');
    } else {
        next();
    }
}

// Cierra una sesión.
exports.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
}

// Verifica que el usuario esté autenticado. 
// Utilizado en main-layout.pug
exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return true;
    } else {
        return false;
    }
}
