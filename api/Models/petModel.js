const {sequelize, DataTypes } = require('./db');

// Definir modelo pet
const Pet = sequelize.define('pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,  
    },
    size: {
      type: DataTypes.ENUM('big', 'medium', 'small'),
      defaultValue: 'big'
    },
    temper: {
      type: DataTypes.ENUM('energetic', 'calm', 'playful', 'shy'),
      defaultValue: 'calm',
    },
    dogs_friendly: { // bug desde postman
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    kids_friendly: { // bug desde postman
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    urgency: {
      type: DataTypes.ENUM('urgent', 'not urgent'),
      defaultValue: 'not urgent',
    }
  });



  module.exports = {
    Pet
};