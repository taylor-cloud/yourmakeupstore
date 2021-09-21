const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const user = require('../models/dao-user');

// Inicialización de passport

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        user.findByEmail(email).then(result => {
            if (result.length == 0) {
                // Si no existe mail
                return done(null, false, { message: 'No existe un usuario con este email. ' });
            } else {
                // Si existe mail
                bcrypt.compare(password, result[0].userPassword).then(doMatch => {
                    if (doMatch) {
                        // Si password coincide
                        return done(null, result[0]);
                    } else {
                        // Si password no coincide
                        return done(null, false, { message: 'Contraseña incorrecta. ' });
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    passport.use(new LocalStrategy( { usernameField: 'email', passwordField: 'password' }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.idUser);
    });

    passport.deserializeUser((id, done) => {
        return done(null, user.findByIdUser(id))
    });
}

module.exports = initialize;