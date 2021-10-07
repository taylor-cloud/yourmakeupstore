// Crear y definir tabla de direcciones
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('addresses', {

        idAddress: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    
        addressStreet: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        addressNumber: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
        addressDepartment: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
}