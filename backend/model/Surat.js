const { Sequelize } = require('sequelize')
const db = require('../config/database')
const User = require('./User');

const { DataTypes } = Sequelize;
const Surat = db.define('surat',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    name_letter:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    file:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        
    },
    comment: {
        type: DataTypes.TEXT,
    },

},{
    freezeTableName:true
});
User.hasMany(Surat);
Surat.belongsTo(User, {foreignKey: "userId"});
module.exports = Surat;