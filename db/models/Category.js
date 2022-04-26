
module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category",
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
                
            },
            name:DataTypes.STRING
        },
         {  
            tableName: "categories",
            timestamps: false
            
         });

         Category.associate = function(models){
            Category.hasMany(models.Product,{
                as: "relCategoriesProduct", 
                foreignKey: "id",
    
            })
         };
         




    return Category;

}