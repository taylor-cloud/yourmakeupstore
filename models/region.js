// Crear y definir tabla regiones
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('regiones', {

        idRegion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        regionNombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
}