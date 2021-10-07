// Crear y definir tabla de contactos
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('contacts', {

        idContact: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    
        contactCellphone: {
            type: DataTypes.INTEGER(9),
            allowNull: false
        }
        
    });
}