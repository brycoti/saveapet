const { sequelize, DataTypes } = require('./db');

// Definir el modelo Chat
const Chat = sequelize.define('Chat', {

  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
