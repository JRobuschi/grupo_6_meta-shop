const DB = require('../../db/models');
const sequelize = DB.sequelize;

module.exports = {
    list: (req, res) => {
        DB.Product.findAll()
        .then(products => {
            res.status(200).json({
                total: products.length,
                data: products,
                status: 200
            })
        })
    
    },
    show: (req, res) => {
        DB.Product.findByPk(req.params.id)
        .then(product => {
            res.status(200).json({         
                data: product,
                url: req.originalUrl,
                status: 200
            })
        })
    
    },
    
}