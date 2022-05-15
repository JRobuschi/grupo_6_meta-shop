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

  store: (req, res) => {
    DB.User //consulta sobre el usuario dentro del modelo
    .create(req.body)//pide info al body, crea con la info q pide en el body y retornala para q yo la vea
    .then(idUser => { //1 solo user
      return res.status(200).json({ //jsn para genera un endpoint
      data: idUser, //1 solo user
      status: 200, //se estan creando usarios sin password
      created: 'El usuario ha sido creado exitosamente'
    })
  })

  },

  delete: (req, res) => {
    DB.User //consulta sobre el usuario dentro del modelo
    .destroy({
      where: {
        idUser: req.params.id
      }
    })//destrui lo q llege en el request en los parametros de id
    .then((response) => { 
      return res.json(response)//responde 1 es q elimino
    })
  },
    search: (req, res) => {
      DB.User //consulta sobre el usuario dentro del modelo
      .findAll({
        where:{
          title:{ [Op.like]: '%' + req.query.keyword + '%'}  //operador like y keywords de busqueda
        }
      })
      .then(idUser => {
        return res.status(200).json(idUser); //lo que vos pienses q necesita la persona q consume el api
      })
}
}