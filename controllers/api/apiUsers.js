const DB = require ('../../db/models');
const Op = DB.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    
    DB.User //consulta sobre el usuario dentro del modelo
    .findAll()
    .then(users => {
      return res.status(200).json({ //jsn para genera un endpoint
      total: users.length,
      data: users,
      status: 200
    })
  })
  },

  show: (req, res) => {
    DB.User //consulta sobre el usuario dentro del modelo
    .findByPk(req.params.id)
    .then(users => { //1 solo user
      return res.status(200).json({ //jsn para genera un endpoint
      data: users, //1 solo user
      status: 200
    })
  })

  },
}