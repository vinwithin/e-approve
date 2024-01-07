const { Sequelize } = require('sequelize');
const db = new Sequelize('ajuansurat', 'root', '',{
    host: "localhost",
    dialect : "mysql"
})
module.exports= db;