// Crear y definir tabla de personas
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('persons', {

        idPerson: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    
        personName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    
        personLastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        }

    });
}