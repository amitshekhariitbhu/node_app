/**
 * Created by amitshekhar on 27/03/16.
 */

module.exports.internalError = {
    status : 500,
    message : "Internal Error"
};

module.exports.UserData = function(result,message){
    this.message = message;
    this.id = result[0].id;
    this.firstname = result[0].firstname;
    this.lastname = result[0].lastname;
};