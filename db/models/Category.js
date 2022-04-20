module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category",
        {
            idCategoryProduct:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            typeOfCategory: DataTypes.STRING
        },
         {  
            tableName: "categories",
            
         });

         Category.associate = function(models){
            Category.belongsToMany(models.Product,{
                as: "relCategoryProduct", 
                through: "categoryproduct",
                foreignKey: "idProduct",
                otherKey: "idCategoriesProduct",
    
            })
         };
         




    return Category;

}