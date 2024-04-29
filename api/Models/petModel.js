const {sequelize, DataTypes } = require('../db');

// Definir modelo pet
const Pet = sequelize.define('Pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,  
      allowNull: false
    },
    size: {
      type: DataTypes.ENUM('grande', 'mediano', 'pequeño'),
      allowNull: false,
      defaultValue: 'grande'
    },
    temper: {
      type: DataTypes.ENUM('energico', 'calmado', 'jugueton', 'timido'),
      allowNull: false,
      defaultValue: 'energico'
    },
    dogs_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    kids_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    urgency: {
      type: DataTypes.ENUM('urgente', 'no urgente'),
      allowNull: false,
      defaultValue: 'no urgente'
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true // Es permet valor nul per a la foto
    }
  });

  module.exports = {
    Pet
};