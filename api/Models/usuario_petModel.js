const {sequelize, DataTypes } = require('./db');


 // Definir modelo usuario_pet
 const UsuarioPet = sequelize.define('usuario_pet', {  
 /* adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

    */
  });


  
  module.exports = {
    UsuarioPet
};