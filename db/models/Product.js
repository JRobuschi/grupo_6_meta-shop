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
    },
     pdtPrice: DataTypes.INTEGER,
     pdtName: DataTypes.STRING
    
}
Product.associate = function(models){
    Product.belongsTo(models.Category,{
        as: "relCategoryProduct", 
        through: "categoryproduct",
        foreignKey: "idCategories",
        otherKey: "idProduct",

    })
};

    const Product = sequelize.define(alias, columnas, configuracion);
    return Product
};