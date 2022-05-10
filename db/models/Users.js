// /**
//  * @param {import('sequelize').Sequelize}sequelize
//  * @param {import('sequelize/dist').DataTypes}DataTypes
//  */
 
 module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User",
        {
            idUser:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            nombre: DataTypes.STRING,
            apellido: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            image: DataTypes.STRING
        }, 
        {           
            timestamps: false,
            tableName: 'users'            
        });

        User.associate = function (models) {
            // associations can be defined here
            User.hasMany(models.Cart, {
                as: "relUserCart",
                foreignKey: "idUser",
            });
        };

    return User;

}