const { sequelize, DataTypes } = require('./db');


const UserPetMatch = sequelize.define('UserPetMatch', {

  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  adopted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = {
  UserPetMatch
};