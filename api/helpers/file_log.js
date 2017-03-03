/**
 * Created by amitshekhar on 03/03/17.
 */
"use strict";
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const Timestamp = require('./timestamp');
const path = require('path');

const debug = new (require('./debug'))();

class FileLog {

    constructor() {

        this._isLogRequest = logReq;
        this._isLogResponse = logRes;
        this._isLogError = logErr;

        if (FileLog.separator === undefined) {
            FileLog.separator = '\n......................................................................\n\n\n';
        }

        if(FileLog.logDir === undefined){
            FileLog.logDir = './../log/'
        }
    }

    get _isLogRequest() {
        return this.isLogRequest;
    }

    set _isLogRequest(isLogRequest) {
        this.isLogRequest = isLogRequest;
    }

    get _isLogResponse() {
        return this.isLogResponse;
    }

    set _isLogResponse(isLogResponse) {
        this.isLogResponse = isLogResponse;
    }

    get _isLogError() {
        return this.isLogError;
    }

    set _isLogError(isLogError) {
        this.isLogError = isLogError;
    }

    logRequest(req) {

        if(this._isLogRequest){

            this.writeReq(req, FileLog.logDir, 'request');
        }
    }

    logResponse(res, obj) {

        if(this._isLogResponse) {

            var fileType = 'response';

            this.writeReq(res.req, FileLog.logDir, fileType);

            this.getDirectory(FileLog.logDir)
                .then(dirPath => {

                    const logText =
                        `${JSON.stringify(obj, null, 2)}` +
                        `${FileLog.separator}`;

                    return fs.appendFileAsync(path.join(dirPath + '/' + fileType + '.log'), logText)
                })
                .catch(err => debug.log(err));
        }
    }

    logError(err) {

        if(this._isLogError) {

            this.getDirectory(FileLog.logDir)
                .then(dirPath => {

                    const timestamp = new Timestamp();

                    const logText =
                        `${timestamp.getYMDHMS()}` + `\n` +
                        `${JSON.stringify(err, null, 2)}` +
                        `${FileLog.separator}`;

                    return fs.appendFileAsync(path.join(dirPath + '/' + 'error' + '.log'), logText)
                })
                .catch(err => debug.log(err));
        }
    };

    writeReq(req, fileDir, fileType) {

        this.getDirectory(fileDir)
            .then(dirPath => {

                const timestamp = new Timestamp();

                const logText =
                    `${req.originalUrl}` + `\n` +
                    `${req.method}` + `\n` +
                    `${timestamp.getYMDHMS()}` + `\n` +
                    `${JSON.stringify(req.headers, null, 2)}` + `\n` +
                    `${JSON.stringify(req.body, null, 2)}` + `\n` +
                    `${FileLog.separator}`;

                return fs.appendFileAsync(path.join(dirPath + '/' + fileType + '.log'), logText)
            })
            .catch(err => debug.log(err));
    }

    getDirectory(relDirPath) {

        const timestamp = new Timestamp();

        var dirPath = path.join(__dirname, relDirPath + timestamp.getYMD());

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        return promise.resolve(dirPath)
    }
}

module.exports = FileLog;