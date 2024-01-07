const { Sequelize } = require('sequelize')
const db = require('../config/database')

const { DataTypes } = Sequelize;
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true
});
module.exports = Users;