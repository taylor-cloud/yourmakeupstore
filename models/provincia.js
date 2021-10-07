// Crear y definir tabla provincias
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('provincias', {

        idProvincia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        provinciaNombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
}