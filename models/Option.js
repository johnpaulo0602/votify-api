const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Competition = require('./Competition');

const Option = sequelize.define('Option', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relação: Uma Competição tem muitas Opções
Competition.hasMany(Option, { as: 'options', foreignKey: 'competitionId' });
Option.belongsTo(Competition, { foreignKey: 'competitionId' });

module.exports = Option;
