const sequelize = require('sequelize');

const alias = 'Product';



const configuracion = {
    timestamps: false,
    tableName: 'productos'
}



module.exports = (sequelize, DataTypes) => {
    const columnas = {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
     pdtPrice: DataTypes.INTEGER,
     pdtName: DataTypes.STRING
    
}

    const Product = sequelize.define(alias, columnas, configuracion);
    return Product
};