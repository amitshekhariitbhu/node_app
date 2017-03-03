/**
 * Created by amitshekhar on 03/03/17.
 */
const express = require('express');
const router = express.Router();

let User = require('./../models/user');
let BadRequestResponse = require('./../helpers/response').BadRequestResponse;
let SuccessResponse = require('./../helpers/response').SuccessResponse;
let SuccessResponseWithoutData = require('./../helpers/response').SuccessResponseWithoutData;


router.get('/getAllUsers/:pageNumber', function(req, res, next) {

    req.checkQuery('limit', 'limit is empty').notEmpty();
    req.checkQuery('limit', 'limit should be a number').isInt();
    req.check('pageNumber', 'pageNumber is empty').notEmpty();
    req.check('pageNumber', 'pageNumber should be a number').isInt();

    var validErr = req.validationErrors();
    if (validErr) {
        return new BadRequestResponse(validErr[0].msg).send(res);
    }

    User.getAsPage(req.params.pageNumber, req.query.limit)
        .then(userArray => {
            return new SuccessResponse("success", userArray).send(res);
        })
        .catch(err => next(err))
});

router.get('/getAnUser/:userId', function(req, res, next) {

    req.check('userId', 'userId is empty').notEmpty();
    req.check('userId', 'userId should be a number').isInt();

    var validErr = req.validationErrors();
    if (validErr) {
        return new BadRequestResponse(validErr[0].msg).send(res);
    }

    var userId = req.params.userId;

    User.get(req.params.userId)
        .then(user => {
            return new SuccessResponse("success", user).send(res);
        })
        .catch(err => next(err))
});

router.post('/createAnUser',function(req, res, next){

    req.checkBody('firstname', 'firstname is empty').notEmpty();
    req.checkBody('lastname', 'lastname is empty').notEmpty();

    var validErr = req.validationErrors();
    if (validErr) {
        return new BadRequestResponse(validErr[0].msg).send(res);
    }

    new User(
        req.body.firstname,
        req.body.lastname
    ).create()
        .then(user => {
            return new SuccessResponse("User Created Successfully.", user).send(res);
        })
        .catch(err => next(err))
});

router.get('/checkForHeader',function(req,res,next){
    checkHeader(req,res);
});

router.post('/checkForHeader',function(req,res,next){
    checkHeader(req,res);
});

function checkHeader(req,res){

    req.checkHeaders('token', 'token is empty').notEmpty();
    req.checkHeaders('token', "token is invalid").isInt();

    var validErr = req.validationErrors();
    if (validErr) {
        return new BadRequestResponse(validErr[0].msg).send(res);
    }

    if (req.headers.token != 1234) {
        return new BadRequestResponse("token is not valid").send(res);
    } else {
        return new SuccessResponseWithoutData("token is valid").send(res);
    }

}

module.exports = router;