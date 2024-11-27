const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Option = require('./Option');

const Vote = sequelize.define('Vote', {
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relação: Uma Opção tem muitos Votos
Option.hasMany(Vote, { as: 'votes', foreignKey: 'optionId' });
Vote.belongsTo(Option, { foreignKey: 'optionId' });

module.exports = Vote;
