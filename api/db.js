const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('saveapet', 'root', 'admin', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    DataTypes
};