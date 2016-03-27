/**
 * Created by amitshekhar on 27/03/16.
 */
var express = require('express');
var router = express.Router();
var dao = require('./dao');
var response = require('./response');

router.get('/getAllUsers/:pageNumber', function(req, res, next) {
    var pageNumber = req.params.pageNumber;
    var limit = req.query.limit;
    console.log("limit "+limit);
    if(isNaN(pageNumber)){
        res.status(response.badRequest.status).json( response.badRequest);
        return;
    }

    dao.getAllUserData(pageNumber,req.query.limit,function(err,results){
        if(err){
            console.log("err : " +err);
            res.status(response.internalError.status).json( response.internalError);
            return;
        }else {
            res.send(results);
        }
    });
});

router.get('/getAUser/:userId', function(req, res, next) {
    var userId = req.params.userId;
    if(isNaN(userId)){
        res.status(response.badRequest.status).json( response.badRequest);
        return;
    }
    dao.getAUserData(userId,function(err,results){
        if(err){
            console.log("err : " +err);
            res.status(response.internalError.status).json( response.internalError);
            return;
        }else {
            res.json(new response.UserData(results,"Success"));
            return;
        }
    });
});

router.post('/createAnUser',function(req,res,next){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;

    console.log('firstName : '+firstName);
    console.log('lastName : '+lastName);

    if(firstName==undefined || lastName == undefined){
        res.status(response.badRequest.status).json( response.badRequest);
        return;
    }

    dao.createAnUserInDatabase(firstName,lastName,function(err,results){
        if(err){
            console.log("err : " +err);
            res.status(response.internalError.status).json( response.internalError);
            return;
        }else {
            res.json(new response.UserCreated(results.insertId,"Success"));
        }
    });
});

router.get('/checkForHeader',function(req,res,next){
    checkHeader(req,res);
});

router.post('/checkForHeader',function(req,res,next){
    checkHeader(req,res);
});

function checkHeader(req,res){
    var token = req.headers.token;
    console.log('token : '+token);
    if(token!=undefined){
        if(!isNaN(token) && token == 1234){
            res.json(new response.HeaderData(token,"Success"));
            return;
        }
        res.status(response.badRequest.status).json( response.unauthorized);
        return;
    }else {
        res.status(response.badRequest.status).json( response.unauthorized);
        return;
    }
}

module.exports = router;