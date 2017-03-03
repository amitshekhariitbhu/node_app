/**
 * Created by amitshekhar on 03/03/17.
 */
"use strict";

const FileLog = new (require('./file_log'))();

class Response {

    constructor(statusCode, message) {
        this._statusCode = statusCode;
        this._message = message;
    }

    set _statusCode(code) {
        this.status_code = code;
    }

    get _statusCode() {
        return this.status_code;
    }

    set _message(message) {
        this.message = message;
    }

    get _message() {
        return this.message;
    }

    getResObj() {
        return this;
    }

    send(res, status) {
        const resObj = this.getResObj();
        res.status(status).json(resObj);
        FileLog.logResponse(res, resObj)
    }

}

class UploadSuccessResponse extends Response {

    constructor() {
        super('success', "Image Uploaded Successfully");
    }

    send(res) {
        super.send(res, 200)
    }
}

class BadRequestResponse extends Response {

    constructor(message) {
        super('failed', (message || 'Bad Parameters'));
    }

    send(res) {
        super.send(res, 400)
    }
}

class InternalErrorResponse extends Response {

    constructor(message) {
        super('failed', (message || 'Internal Error'));
    }

    send(res) {
        super.send(res, 500)
    }
}

class AuthFailureResponse extends Response {

    constructor(message) {
        super('failed', (message || 'Authentication Failure'));
    }

    send(res) {
        res.status(401).json(this.getResObj());
    }
}

class NotFoundResponse extends Response {

    constructor(message, url) {
        super('failed', (message || 'Not Found'));
        this._url = url;
    }

    get _url(){
        return this.url;
    }

    set _url(url){
        this.url = url;
    }

    getResObj() {
        return {
            status_code: this._statusCode,
            url: this._url,
            message: this._message
        };
    }

    send(res) {
        this._url = res.req.originalUrl;
        res.status(404).json(this.getResObj());
    }
}

class SuccessResponse extends Response {

    constructor(message, data) {
        super('success', message);
        this._data = data;
    }

    set _data(data) {
        this.data = data;
    }

    get _data() {
        return this.data;
    }

    send(res) {
        const resObj = this.getResObj();
        res.status(200).json(resObj);
        FileLog.logResponse(res, resObj)
    }

    getResObj() {
        return {
            status_code: this._statusCode,
            message: this._message,
            data: this._data
        };
    }
}

class ForbiddenResponse extends Response {

    constructor(message) {
        super('failed', (message || 'Forbidden'));
    }

    send(res) {
        res.status(403).json(this.getResObj());
    }
}

class CustomErrorResponse extends Response {

    constructor(statusCode, message) {
        super((statusCode || 'failed'), (message || 'Internal Error'));
    }

    send(res, status) {
        super.send(res, (status || 500))
    }
}

class AccessTokenErrorResponse extends Response {

    constructor(message) {
        super('invalid_access_token', (message || 'Access token invalid'));
    }

    send(res) {
        res.setHeader("instruction", "refresh_token");
        res.status(401).json(this.getResObj());
    }
}

class SuccessResponseWithoutData extends Response {

    constructor(message) {
        super('success', message);
    }

    send(res) {
        super.send(res, 200)
    }
}

module.exports = Response;
module.exports.UploadSuccessResponse = UploadSuccessResponse;
module.exports.BadRequestResponse = BadRequestResponse;
module.exports.InternalErrorResponse = InternalErrorResponse;
module.exports.AuthFailureResponse = AuthFailureResponse;
module.exports.NotFoundResponse = NotFoundResponse;
module.exports.SuccessResponse = SuccessResponse;
module.exports.ForbiddenResponse = ForbiddenResponse;
module.exports.CustomErrorResponse = CustomErrorResponse;
module.exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
module.exports.SuccessResponseWithoutData = SuccessResponseWithoutData;