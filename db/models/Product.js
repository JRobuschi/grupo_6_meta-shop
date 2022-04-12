const sequelize = require('sequelize');

const alias = 'Product';

const columnas = {
    id: {type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false},
    pdtPrice: sequelize.DataTypes.INTEGER,

}

const Product = sequelize.define(alias, caolumnas, configuracion);