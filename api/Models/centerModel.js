const bcrypt = require('bcrypt');
const {sequelize, DataTypes } = require('./db');

// Define the Center model
const Center = sequelize.define('Center', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    web: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Center.beforeCreate(async (center) => {
    const hashedPassword = await bcrypt.hash(center.password, 10); // Encrypt the password with bcrypt
    center.password = hashedPassword; // Set the user's password to the hashed password
  });



  module.exports = {
    Center,
};