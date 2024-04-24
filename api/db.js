const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('saveapet', 'root', 'admin', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    DataTypes
};