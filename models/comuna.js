// Crear y definir tabla comunas
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('comunas', {

        idComuna: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        comunaNombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
}