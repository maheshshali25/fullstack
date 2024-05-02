const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const sequelize  = require('../server/config/db');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', studentRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
    console.log(`Server is up and running in port ${PORT}`)
  })