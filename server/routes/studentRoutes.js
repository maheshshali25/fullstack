const express = require('express');
const router = express.Router();
const studentController = require('../contorllers/studentController');

router.get('/students', studentController.getStudents);

module.exports = router;
