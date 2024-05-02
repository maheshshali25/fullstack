const Student = require('../models/Student');
const { Op } = require('sequelize');

exports.getStudents = async (req, res) => {
  try {
    const { page = 1, size = 10, name, total_marks } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (total_marks) where.total_marks = total_marks;

    const { count, rows } = await Student.findAndCountAll({
      where,
      limit: parseInt(size),
      offset: (page - 1) * parseInt(size)
    });

    res.status(200).json({
      total: count,
      per_page: parseInt(size),
      current_page: parseInt(page),
      data: rows
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
