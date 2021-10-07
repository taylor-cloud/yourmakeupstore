// Crear y definir tabla de usuarios
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('user', {

        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    
        userEmail: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    
        userPassword: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    
        userRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    });
}