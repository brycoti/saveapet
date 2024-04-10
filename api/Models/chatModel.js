const {sequelize, DataTypes } = require('./db');


// Definir el modelo Chat
const Chat = sequelize.define('Chat', {
  centerId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'Center', // Asegúrate de que el nombre del modelo coincida
        key: 'id'
    }
},

// ID del usuario: referencia al usuario en la conversación
userId: {
  type: DataTypes.BIGINT,
  allowNull: false,
  references: {
      model: 'User', // Asegúrate de que el nombre del modelo coincida
      key: 'id'
  }
},
// ID del centro: referencia al centro en la conversación
centerId: {
  type: DataTypes.BIGINT,
  allowNull: false,
  references: {
      model: 'Center', // Asegúrate de que el nombre del modelo coincida
      key: 'id'
  }
},
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
});


module.exports = {
  Chat
};