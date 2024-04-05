const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Initialize Sequelize connection
const sequelize = new Sequelize('saveapet', 'root', 'admin', {
    host: 'localhost',
    port: 3308,
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
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.ENUM('big', 'medium', 'small'),
      allowNull: false
    },
    temper: {
      type: DataTypes.ENUM('energetic', 'calm', 'playful'),
      defaultValue: 'calm',
      allowNull: false
    },
    dogs_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    kids_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    urgency: {
      type: DataTypes.ENUM('urgent', 'not urgent'),
      defaultValue: 'not urgent',
      allowNull: false
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
  
  // Definir relaciones
  User.belongsToMany(Pet, { through: 'usuario_pet', foreignKey: 'id_user' });
  Pet.belongsToMany(User, { through: 'usuario_pet', foreignKey: 'id_pet' });

// Define the beforeCreate hook outside of the sequelize.define call
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encrypt the password with bcrypt
    user.password = hashedPassword; // Set the user's password to the hashed password
});

// Relations 
User.hasMany(Adoption);
Adoption.belongs(User);

Adoption.hasMany(Pet);
Pet.belongs(Adoption);
 
Center.belongsToMany(Pet, { through: 'CenterPet' });
Pet.belongsToMany(Center, { through: 'CenterPet' });

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
// iniDB();

module.exports = {
    User,
    Center,
    Pet,
    sequelize
};