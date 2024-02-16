const { Sequelize } = require('sequelize')
const db = require('../config/database')
const Surat = require('./Surat');
const { DataTypes } = Sequelize;
const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true
});
module.exports = Users;