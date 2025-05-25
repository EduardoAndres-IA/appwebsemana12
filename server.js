const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
});