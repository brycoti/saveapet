const { sequelize, DataTypes } = require('./db');
const { User } = require('./userModel');
const { Center } = require('./centerModel');
const { BIGINT } = require('sequelize');

// Definir el modelo Chat
const Chat = sequelize.define('Chat', {

  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,

  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  centerId: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
});



module.exports = {
  Chat
};
