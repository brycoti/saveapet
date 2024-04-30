const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

//Models
const { User } = require('../Models/userModel');
const { Center } = require('../Models/centerModel');
const { Pet } = require('../Models/petModel');
const { UserPetMatch } = require('./userPetMatchModel');


// Function to initialize the database
async function iniDB() {
  try {
    await sequelize.sync({ force: true }); // This will drop the table if it already exists
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize database:', error);
  }
}


// Call the function to initialize the database
  // iniDB();


// Center can create a pet
Pet.belongsTo(Center);
Center.hasMany(Pet);

// UserPetMatch Model adjustments
UserPetMatch.belongsTo(Pet, {
  foreignKey: 'petId', // Ensuring foreign key is consistently named

});

Pet.hasMany(UserPetMatch, {
  foreignKey: 'petId', // Consistent use of 'petId' as foreign key

});

UserPetMatch.belongsTo(User, {
  foreignKey: 'userId', // Make sure to use 'userId' consistently

});

User.hasMany(UserPetMatch, {
  foreignKey: 'userId',

});

// Ensuring consistent foreign key setup in Pet and User many-to-many relation
Pet.belongsToMany(User, {
  through: UserPetMatch,
  foreignKey: 'petId',
  otherKey: 'userId'
});

User.belongsToMany(Pet, {
  through: UserPetMatch,
  foreignKey: 'userId',
  otherKey: 'petId'
});


module.exports = {
  User,
  Center,
  Pet,
  UserPetMatch
};