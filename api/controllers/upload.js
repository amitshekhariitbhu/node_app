/**
 * Created by amitshekhar on 27/03/16.
 */
var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({ dest: './uploaded_images/',limits: { fileSize: 20* 1024 * 1024}}).single('image');
let SuccessResponseWithoutData = require('./../helpers/response').SuccessResponseWithoutData;
let BadRequestResponse = require('./../helpers/response').BadRequestResponse;

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return new BadRequestResponse("Invalid Image Upload Request").send(res);
        }
        return new SuccessResponseWithoutData("Image Uploaded Successfully").send(res);
    })
});

module.exports = router;