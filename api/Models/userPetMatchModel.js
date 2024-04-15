const { sequelize, DataTypes } = require('./db');

// Definir el modelo Chat
const UserPetMatch = sequelize.define('UserPetMatch', {

  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  }
});



module.exports = {
  UserPetMatch
};