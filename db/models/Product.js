const sequelize = require('sequelize');

const alias = 'Product';



const configuracion = {
    timestamps: false,
    tableName: 'products'
}



module.exports = (sequelize, DataTypes) => {
    const columnas = {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    pdtDescription: DataTypes.STRING,
     idCategory: DataTypes.INTEGER,
     pdtPrice: DataTypes.INTEGER,
     pdtName: DataTypes.STRING,
     image: DataTypes.STRING,   
}

 const Product = sequelize.define(alias, columnas, configuracion);
 Product.associate = function(models){
    Product.belongsTo(models.Category,{
        as: "category", 
        foreignKey: "id",
        
    })
    Product.hasMany(models.CartProduct,{
        as: "productCart",
        foreignKey:"idCartProduct",
    })
};

   
    return Product
};