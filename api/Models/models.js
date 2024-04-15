const { Sequelize, DataTypes } = require('sequelize');
const  { sequelize } = require('./db');

//Models
const { User } = require('../Models/userModel');
const { Center } = require('../Models/centerModel');
const { Pet } = require('../Models/petModel');
const { UsuarioPet } = require('../Models/usuario_petModel');
const { UserPetMatch } = require('./userPetMatchModel');

// Call the function to initialize the database

// Function to initialize the database
async function iniDB() {
    try {
        await sequelize.sync({ force: true }); // This will drop the table if it already exists
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Failed to synchronize database:', error);
    }
}

// set up

// iniDB();


// User can match a dog
  Pet.belongsTo(User);
  User.hasMany(Pet);

// Center can create a pet
  Pet.belongsTo(Center);
  Center.hasMany(Pet);

module.exports = {
    User,
    Center,
    Pet,
    UsuarioPet,
    UserPetMatch
};