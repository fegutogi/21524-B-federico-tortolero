const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('posteos_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {sequelize}