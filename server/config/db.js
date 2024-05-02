const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_details', 'root', 'password', {
  host: 'localhost',
  port: 33061,
  dialect: 'mysql'
});

module.exports = sequelize;