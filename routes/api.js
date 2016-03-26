/**
 * Created by amitshekhar on 27/03/16.
 */
var express = require('express');
var router = express.Router();
var dao = require('./dao');
var response = require('./response');

router.get('/getData', function(req, res, next) {
    dao.getUserData(function(err,results){
        if(err){
            console.log("err : " +err);
            res.status(response.internalError.status).json( response.internalError);
            return;
        }else {
            res.send(results);
        }
    });
});

module.exports = router;