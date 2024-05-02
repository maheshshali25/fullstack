const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('student_details', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_marks: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'student_details',
  timestamps: false
});

module.exports = Student;
