/**
 * Created by amitshekhar on 27/03/16.
 */

module.exports.internalError = {
    status : 500,
    message : "Internal Error"
};

module.exports.badRequest = {
    status : 400,
    message : "Bad Parameter"
};

module.exports.unauthorized = {
    status : 401,
    message : "unauthorized"
};

module.exports.notFound = {
    status : 404,
    message : "notFound"
};

module.exports.Success = function(message){
    this.message = message;
};

module.exports.UserData = function(result,message){
    this.message = message;
    this.id = result[0].id;
    this.firstname = result[0].firstname;
    this.lastname = result[0].lastname;
};

module.exports.UserCreated = function(id,message){
    this.message = message;
    this.id = id;
};

module.exports.HeaderData = function(token,message){
    this.message = message;
    this.token = token;
};

