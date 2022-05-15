const DB = require('../../db/models');
const Op = DB.Sequelize.Op;

module.exports = {
    list: (req, res) =>{
        return res.json('hola')
    } 
}