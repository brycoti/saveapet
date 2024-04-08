const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Initialize Sequelize connection
const sequelize = new Sequelize('saveapet', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});


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
        type: DataTypes.INTEGER,
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

// Define the Pet model
const User = sequelize.define('User', {
    name: {
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
  
  // Definir modelo pet
  const Pet = sequelize.define('pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,  
    },
    size: {
      type: DataTypes.ENUM('big', 'medium', 'small'),
      defaultValue: 'big'
    },
    temper: {
      type: DataTypes.ENUM('energetic', 'calm', 'playful', 'shy'),
      defaultValue: 'calm',
    },
    dogs_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    kids_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    urgency: {
      type: DataTypes.ENUM('urgent', 'not urgent'),
      defaultValue: 'not urgent',
    }
  });
  
  // Definir modelo usuario_pet
  const UsuarioPet = sequelize.define('usuario_pet', {
    adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  
    // Definir el modelo Chat
const Chat = sequelize.define('Chat', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  }
  // No necesitas definir aquí las claves foráneas, Sequelize lo maneja por ti
});


// Define the beforeCreate hook outside of the sequelize.define call
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encrypt the password with bcrypt
    user.password = hashedPassword; // Set the user's password to the hashed password
});

Center.beforeCreate(async (center) => {
  const hashedPassword = await bcrypt.hash(center.password, 10); // Encrypt the password with bcrypt
  center.password = hashedPassword; // Set the user's password to the hashed password
});

// Relations
User.belongsToMany(Pet, { through: 'usuario_pet', foreignKey: 'id_user' });
Pet.belongsToMany(User, { through: 'usuario_pet', foreignKey: 'id_pet' });

Center.hasMany(Pet);
Pet.belongsTo(Center);

User.belongsToMany(Center, { through: Chat, foreignKey: 'userId', otherKey: 'centerId' });
Center.belongsToMany(User, { through: Chat, foreignKey: 'centerId', otherKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });
Chat.belongsTo(Center, { foreignKey: 'centerId' });
User.hasMany(Chat, { foreignKey: 'userId' });
Center.hasMany(Chat, { foreignKey: 'centerId' });

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

module.exports = {
    User,
    Center,
    Pet,
    UsuarioPet,
    Chat,
    sequelize
};