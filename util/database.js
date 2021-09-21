const {Sequelize} = require('sequelize');

// Conexión a la base de datos.

const sequelize = new Sequelize('yms', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost', 
    useUTC: false,
    timezone: '-04:00'
});

module.exports = sequelize;