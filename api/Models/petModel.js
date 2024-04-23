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
      type: DataTypes.ENUM('big', 'medium', 'small'),
      allowNull: false,
      defaultValue: 'big'
    },
    temper: {
      type: DataTypes.ENUM('energetic', 'calm', 'playful', 'shy'),
      allowNull: false,
      defaultValue: 'energetic'
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
      type: DataTypes.ENUM('urgent', 'not urgent'),
      allowNull: false,
      defaultValue: 'not urgent'
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true // Es permet valor nul per a la foto
    }
  });

  module.exports = {
    Pet
};