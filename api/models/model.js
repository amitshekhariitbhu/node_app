/**
 * Created by amitshekhar on 03/03/17.
 */
const Promise = require('bluebird');
const Query = require('./../helpers/query');
const Timestamp = require('./../helpers/timestamp');

const InternalError = require('./../helpers/error').InternalError;
const NoSuchEntityExistsError = require('./../helpers/error').NoSuchEntityExistsError;

const debug = new (require('./../helpers/debug'))();

class Model {

    constructor(id) {
        this._id = id;
    }

    copy({id}) {
        this._id = id;

        return this;
    }

    clean(){
        let clone = {};
        Object.assign(clone, this);

        for (const i in clone) {
            if (typeof clone[i] === 'undefined') {
                delete clone[i];
            }
        }

        return clone;
    }

    create(sql, obj) {
        return Query.executeInTx(connection => {
            return connection.queryAsync(sql, obj.clean())
        }).then(result => {
            return new Promise((resolve, reject) => {
                if (result.insertId === undefined) {
                    return reject(new InternalError());
                }

                this._id = result.insertId;

                return resolve(obj)
            })
        })
    }

    update(sql, queryvalues) {
        this._updatedAt = new Timestamp().getYMDHMS();

        return Query.executeInTx(connection => {
            return connection.queryAsync(sql, queryvalues);
        }).then(result => {
            return new Promise((resolve, reject) => {
                if (!(result.affectedRows > 0)) {
                    return reject(new InternalError());
                }

                return resolve(this)
            })
        })
    }

    remove(sql, queryvalues) {
        return Query.execute(sql, queryvalues)
            .then(result => {
                return new Promise((resolve, reject) => {
                    if (!(result.affectedRows > 0)) {
                        return reject(new InternalError());
                    }

                    return resolve(true)
                })
            })
    }

    createInTx(connection, sql, obj){
        return connection.queryAsync(sql, obj.clean())
            .then(result => {
                return new Promise((resolve, reject) => {
                    if (result.insertId === undefined) {
                        return reject(new InternalError());
                    }

                    this._id = result.insertId;

                    resolve(obj)
                });
            })
    }

    updateInTx(connection, sql, queryvalues) {
        this._updatedAt = new Timestamp().getYMDHMS();

        return connection.queryAsync(sql, queryvalues)
            .then(result => {
                return new Promise((resolve, reject) => {
                    if (!(result.affectedRows > 0)) {
                        return reject(new InternalError());
                    }

                    return resolve(this)
                })
            })
    }


    static get(sql, queryvalues, Class, errMsg) {
        return Query.execute(sql, queryvalues)
            .then(results => {
                return new Promise((resolve, reject) => {
                    if (results[0] === undefined) {
                        return reject(new NoSuchEntityExistsError(errMsg));
                    }

                    return resolve(new Class().copy(results[0]))
                })
            })
    }

    static getAll(sql, queryvalues, Class, errMsg) {
        return Query.execute(sql, queryvalues)
            .then(results => {
                return new Promise((resolve, reject) => {
                    if (results[0] === undefined) {
                        return reject(new NoSuchEntityExistsError(errMsg));
                    }

                    let array = [];

                    for (let i = 0; i < results.length; i++) {
                        array.push(new Class().copy(results[i]))
                    }

                    return resolve(array)
                })
            })
    }

    get _id() {
        return this.id
    }

    set _id(id) {
        this.id = id;
    }

    get _status() {
        return this.status
    }

    set _status(status) {
        this.status = status;
    }

}

module.exports = Model;