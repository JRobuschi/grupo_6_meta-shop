module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define("Cart",
        {
            idCart:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            idUser: DataTypes.INTEGER
        }, {
            tableName: "carts",
            timestamps: false
        });


    
    Cart.associate = function (models)
    {                           
        Cart.belongsTo(models.User, {
            as: "relCartUser",  //indicamos el nombre de la relacion
            foreignKey: "idUser" // En la tabla carts, como FK guardo un idUser
        });
        Cart.belongsToMany(models.Product,{
            as: "relCartProduct", 
            through: "cartproduct",
            foreignKey: "idCart",
            otherKey: "idUser",
            timestamps: false
        })
    };

    return Cart;

};