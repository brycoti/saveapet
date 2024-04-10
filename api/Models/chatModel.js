const {sequelize, DataTypes } = require('./db');


    // Definir el modelo Chat
    const Chat = sequelize.define('Chat', {
        contenido: {
          type: DataTypes.TEXT,
          allowNull: false
        }
        // No necesitas definir aquí las claves foráneas, Sequelize lo maneja por ti
      });

   
    module.exports = {
      Chat
  };