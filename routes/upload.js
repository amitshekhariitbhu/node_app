/**
 * Created by amitshekhar on 27/03/16.
 */
var express = require('express');
var multer = require('multer');
var router = express.Router();
var dao = require('./dao');
var response = require('./response');
var upload = multer({ dest: './uploaded_images/',limits: { fileSize: 20* 1024 * 1024}}).single('image');

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log('err : '+err);
            res.status(response.badRequest.status).json( response.badRequest);
            return;
        }
        console.log(req.body);
        /* example output:
         { key : value } // extra data in body
         */
        console.log(req.file);
        /* example output:
         { fieldname: 'image',
         originalname: 'messi.png',
         encoding: '7bit',
         mimetype: 'image/png',
         destination: './uploads/',
         filename: '436ec561793aa4dc475a88e84776b1b9',
         path: 'uploaded_images/436ec561793aa4dc475a88e84776b1b9',
         size: 277056 }
         */
        // Everything went fine
        res.json(new response.Success("Success"));
        return;
    })
});

module.exports = router;