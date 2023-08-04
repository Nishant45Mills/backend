const express = require('express');
const route = require('./routes');
const bodyData = require('body-parser');
const errorHandler = require('./middlewares/errorHandle');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyData.json());

app.use('/', route);

app.use(errorHandler);

module.exports = app;