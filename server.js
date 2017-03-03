/**
 * Created by amitshekhar on 03/03/17.
 */
const express = require('express');
const mysql = require("mysql");
const config = require('./config.json');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var compression = require('compression');

const app = express();
const http = require('http').Server(app);

global.logErr = true;
global.logRes = true;
global.logReq = true;


app.use(compression({threshold: 0}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

if(app.get('env')==='production') {
    //production
    global.dbPool = mysql.createPool({
        host: config.production.database.host,
        user: config.production.database.user,
        password: config.production.database.pwd,
        database: config.production.database.db,
        connectionLimit: 10,
        acquireTimeout: 30000
    });
    app.use(require('./api/routes.js'));
}
else{
    //development
    global.dbPool = mysql.createPool({
        host: config.development.database.host,
        user: config.development.database.user,
        password: config.development.database.pwd,
        database: config.development.database.db,
        connectionLimit: 10,
        acquireTimeout: 30000
    });
    app.use(require('./api/routes.js'));
}

app.set('port', process.env.PORT || config.port);
http.listen(app.get('port'));