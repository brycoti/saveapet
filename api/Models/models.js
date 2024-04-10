const { Sequelize, DataTypes } = require('sequelize');


//Models
const { User } = require('../Models/userModel');
const { Center } = require('../Models/centerModel');
const { Chat } = require('../Models/chatModel');
const { Pet } = require('../Models/petModel');
const { UsuarioPet } = require('../Models/usuario_petModel')

// Initialize Sequelize connection

/* const sequelize = new Sequelize('saveapet', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});   */

/* const sequelize = new Sequelize('saveapet', 'root', 'admin', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
}); */

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
//iniDB();

// Relaciones User.belongsToMany(Pet, { through: 'usuario_pet', foreignKey: 'id_user' });
User.belongsToMany(Center, { through: Chat, foreignKey: 'userId', otherKey: 'centerId' });
User.hasMany(Chat, { foreignKey: 'userId' });

  // Center Relation 

  Center.hasMany(Pet);
  Center.belongsToMany(User, { through: Chat, foreignKey: 'centerId', otherKey: 'userId' });
  Center.hasMany(Chat, { foreignKey: 'centerId' });
   // Chat Relations

   Chat.belongsTo(User, { foreignKey: 'userId' });
   Chat.belongsTo(Center, { foreignKey: 'centerId' });

     // Pet relations

  Pet.belongsToMany(User, { through: 'usuario_pet', foreignKey: 'id_pet' });
  Pet.belongsTo(Center);

module.exports = {
    User,
    Center,
    Pet,
    UsuarioPet,
    Chat
};