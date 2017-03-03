/**
 * Created by amitshekhar on 03/03/17.
 */

const Response = require('./response');

class CustomError extends Error {
    constructor(name, message) {
        super();
        this._name = name;
        this._message = message;
    }

    set _name(name) {
        this.name = name;
    }

    get _name() {
        return this.name;
    }

    set _message(message) {
        this.message = (message || "");
    }

    get _message() {
        return this.message;
    }

    static handle(err, res) {
        switch (err.name) {

            case 'AuthFailureError':
                return new Response.AuthFailureResponse(err._message).send(res);

            case 'AccessTokenError':
                return new Response.AccessTokenErrorResponse(err._message).send(res);

            case 'InternalError':
                return new Response.InternalErrorResponse(err._message).send(res);

            case 'NotFoundError':
                err._url = res.req.originalUrl;
                return new Response.NotFoundResponse(err._message).send(res);

            case 'BadRequestError':
                return new Response.BadRequestResponse(err._message).send(res);

            case 'ForbiddenError':
                return new Response.ForbiddenResponse(err._message).send(res);

        }
        // getter is not used to access the variable because there can be not defined error being thrown
        return new Response.CustomErrorResponse(err.statusCode, err.message).send(res, err.status);
    }
}

class AccessTokenError extends CustomError {
    constructor(message) {
        super("AccessTokenError", message)
    }
}

class AuthFailureError extends CustomError {
    constructor(message) {
        super("AuthFailureError", message)
    }
}

class InternalError extends CustomError {
    constructor(message) {
        super("InternalError", message)
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super("BadRequestError", message)
    }
}

class NotFoundError extends CustomError {
    constructor(message, url) {
        super("NotFoundError", message);
        this._url = url;
    }

    get _url(){
        return this.url;
    }

    set _url(url){
        this.url = url;
    }
}

class ForbiddenError extends CustomError {
    constructor(message) {
        super("ForbiddenError", message)
    }
}

class NoSuchUserExistsError extends CustomError {
    constructor(message) {
        super("NoSuchUserExistsError", message)
    }
}

class NoSuchEntityExistsError extends CustomError {
    constructor(message) {
        super("NoSuchEntityExistsError", message)
    }
}

module.exports = CustomError;
module.exports.AccessTokenError = AccessTokenError;
module.exports.AuthFailureError = AuthFailureError;
module.exports.InternalError = InternalError;
module.exports.BadRequestError = BadRequestError;
module.exports.NotFoundError = NotFoundError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NoSuchUserExistsError = NoSuchUserExistsError;
module.exports.NoSuchEntityExistsError = NoSuchEntityExistsError;