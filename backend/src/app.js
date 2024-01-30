const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');


app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);

module.exports = app;
