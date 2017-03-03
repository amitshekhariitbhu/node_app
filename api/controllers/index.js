/**
 * Created by amitshekhar on 03/03/17.
 */
const express = require('express');
const app = express();

app.use('/api', require('./user'));
app.use('/upload', require('./upload'));

module.exports = app;