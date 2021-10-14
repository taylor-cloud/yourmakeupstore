// Crear y definir tabla de categorías
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('categories', {

        idCategory: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        categoryName: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    });
}