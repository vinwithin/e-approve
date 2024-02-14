const { Sequelize } = require('sequelize')
const db = require('../config/database')

const { DataTypes } = Sequelize;
const Surat = db.define('surat',{
    name:{
        type: DataTypes.STRING
    },
    name_letter:{
        type: DataTypes.STRING
    },
    file:{
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER
    },
    revisi: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.TEXT
    },

},{
    freezeTableName:true
});
module.exports = Surat;