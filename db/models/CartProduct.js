const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const CartProduct = sequelize.define("CartProduct",
        {
            idCartProduct: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            productPrice: DataTypes.DECIMAL(18, 2),
            quantity: DataTypes.INTEGER,
            idProduct: DataTypes.INTEGER,
            idCart: DataTypes.INTEGER
        }, 
        {          
            tableName:"cartProduct",
            timestamps: false,          
        });



    CartProduct.associate = function (models) 
    { 
        CartProduct.belongsTo(models.Product, {
            as: "relCartproductProduct",
            foreignKey: "id"
        }),
        CartProduct.belongsTo(models.Cart, {
            as: "relCartproductCart",
            foreignKey: "idCart"
        })
    };
    

    return CartProduct;
    
};