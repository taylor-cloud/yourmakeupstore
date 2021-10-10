// Crear y definir tabla de marcas
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('brands', {

        idBrand: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        brandName: {
            type: DataTypes.STRING(25),
            allowNull: false
        }

    });
}