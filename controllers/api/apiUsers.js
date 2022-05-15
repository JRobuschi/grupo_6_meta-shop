const DB = require ('../../db/models');
const Op = DB.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    
    DB.User //consulta sobre el usuario dentro del modelo
    .findAll()
    .then(apiUsers => {
      return res.status(200).json({ //jsn para genera un endpoint
      total: apiUsers.length,
      data: apiUsers,
      status: 200
    })
  })
  },

  show: (req, res) => {
    DB.User //consulta sobre el usuario dentro del modelo
    .findByPk(req.params.id)
    .then(idUser => { //1 solo user
      return res.status(200).json({ //jsn para genera un endpoint
      data: idUser, //1 solo user
      status: 200
    })
  })

  },
}