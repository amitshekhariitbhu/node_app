/**
 * Created by amitshekhar on 03/03/17.
 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const app = express();


let Error = require('./helpers/error');
let NotFoundError = require('./helpers/error').NotFoundError;

const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), {flags: 'a'});
app.use(logger(':method :url :req[header] :res[header] :status :response-time', {"stream": accessLogStream}));

const debug = new (require('./helpers/debug'))();
const fileLog = new (require('./helpers/file_log'))();

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

app.use((err, req, res, next) => {
    debug.log("Error", err);
    Error.handle(err, res);
    fileLog.logError(err);
});

module.exports = app;