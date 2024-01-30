const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());


// const routes = require('./routes');
// app.use('/api', routes);

module.exports = app;
