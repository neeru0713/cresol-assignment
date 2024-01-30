const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');


app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;
