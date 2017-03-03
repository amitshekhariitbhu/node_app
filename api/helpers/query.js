/**
 * Created by amitshekhar on 03/03/17.
 */
const Promise = require('bluebird');
const debug = new (require('./debug'))();

let InternalError = require('./error').InternalError;
let FileLog = require('./file_log');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

class Query {

    static getSqlConnection() {
        return dbPool.getConnectionAsync().disposer(connection => connection.release());
    }

    static execute(sql, tableData) {

        return Promise.using(Query.getSqlConnection(), connection => {

            debug.log(sql);

            return connection.queryAsync(sql, tableData)
                .catch(e => {

                    debug.log("query err : " + e);

                    new FileLog().logError(e);

                    throw new InternalError("Database Error");
                })
        });
    };

    static executeInTx(fn) {

        return Promise.using(dbPool.getConnectionAsync(), connection => {

            return fn(connection)
                .then(
                    res => {
                        debug.log('connection', 'commit');
                        return connection.commitAsync().thenReturn(res);
                    },
                    err => {
                        debug.log(err);
                        return connection.rollbackAsync()
                            .catch(e => debug.log(e))
                            .thenThrow(new InternalError());
                    })
                .finally(() => connection.release())
        });
    };

}

module.exports = Query;

