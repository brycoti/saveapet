const { Sequelize, DataTypes } = require('sequelize');
const  { sequelize } = require('./db');


//Models
const { User } = require('../Models/userModel');
const { Center } = require('../Models/centerModel');
const { Chat } = require('../Models/chatModel');
const { Pet } = require('../Models/petModel');
const { UsuarioPet } = require('../Models/usuario_petModel');
const { Mensaje } = require('./mensajeModel');


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
iniDB();

// Relaciones User.belongsToMany(Pet, { through: 'usuario_pet', foreignKey: 'id_user' });
User.belongsToMany(Center, { through: Chat, foreignKey: 'userId', otherKey: 'centerId' });
User.hasMany(Chat, { foreignKey: 'userId' });

  // Center Relation 

  Center.hasMany(Pet);
  Center.belongsToMany(User, { through: Chat, foreignKey: 'centerId', otherKey: 'userId' });
  Center.hasMany(Chat, { foreignKey: 'centerId' });
  
// Pet relations

  Pet.belongsToMany(User, { through: 'usuario_pet', foreignKey: 'id_pet' });
  Pet.belongsTo(Center);

// Chat relations

Chat.belongsTo(User, { foreignKey: { name: 'userId'}});

// Un Chat pertenece a un Center
Chat.belongsTo(Center, { foreignKey: {name: 'centerId'}});

Chat.hasMany(Mensaje, { foreignKey: 'chatid' });

Mensaje.belongsTo(Chat, { foreignKey: 'chatid' });
Mensaje.belongsTo(User, { foreignKey: 'userId', allowNull: true });
Mensaje.belongsTo(Center, { foreignKey: 'centerId', allowNull: true })

module.exports = {
    User,
    Center,
    Pet,
    UsuarioPet,
    Chat,
    Mensaje
};