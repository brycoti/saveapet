const { Sequelize, DataTypes } = require('sequelize');
const  { sequelize } = require('../db');

//Models
const { User } = require('../Models/userModel');
const { Center } = require('../Models/centerModel');
const { Pet } = require('../Models/petModel');
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
  Pet.belongsToMany(User, { through: 'UserPetMatch' });
  User.belongsToMany(Pet, { through: 'UserPetMatch' });

// Center can create a pet
  Pet.belongsTo(Center);
  Center.hasMany(Pet);

  // Pet.hasMany(UserPetMatch)
Pet.hasMany(UserPetMatch, {
  foreignKey: 'petId',
  as: 'likes' // This alias can be used in queries
});

// UserPetMatch.belongsTo(Pet)
UserPetMatch.belongsTo(Pet, {
  foreignKey: 'petId',
  as: 'pet'
});

module.exports = {
    User,
    Center,
    Pet,
    UserPetMatch
};