const { sequelize, DataTypes } = require('./db');

const Mensaje = sequelize.define('Mensaje', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  text: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  date: {
      type: DataTypes.DATE,
      allowNull: false
  }
});


module.exports = {
    Mensaje
};
