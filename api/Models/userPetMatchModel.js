const { sequelize, DataTypes } = require('../db');

const UserPetMatch = sequelize.define('UserPetMatch', {
  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  liked:{ // true si un user le ha dado like
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  adopted: { // si esta adopted true, no deberia salir en el front. Es el center quien da el valor de true pq elige a mano que suser puede adoptar
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  watched: {  // si es true, el user ya lo ha visto y no deberia mostrarlo en front
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = {
  UserPetMatch
};