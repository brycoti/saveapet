const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Initialize Sequelize connection
const sequelize = new Sequelize('saveapet', 'root', 'admin', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
});

// Define the User model
const User = sequelize.define('User', {
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
    }
});

// Define the beforeCreate hook outside of the sequelize.define call
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encrypt the password with bcrypt
    user.password = hashedPassword; // Set the user's password to the hashed password
});

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

module.exports = {
    User,
    sequelize
};
