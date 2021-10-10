// Crear y definir tabla de productos
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('products', {

        idProduct: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        productStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        productDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },

        productImgurl: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
}