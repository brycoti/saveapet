
const { sequelize, DataTypes } = require('./db');
const bcrypt = require('bcrypt');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  already_logged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  });

  // Define the beforeCreate hook outside of the sequelize.define call
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // Encrypt the password with bcrypt
  user.password = hashedPassword; // Set the user's password to the hashed password
});





module.exports = {
  User
};