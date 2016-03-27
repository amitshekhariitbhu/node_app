/**
 * Created by amitshekhar on 27/03/16.
 */

module.exports.getAllUserData = function(pageNumber,limit,callback){
    var LIMIT = 10;
    if(limit!=undefined){
        LIMIT = limit;
    }
    dbPool.getConnection( function(err, connection) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        var sql = "SELECT * FROM users LIMIT " +LIMIT+ " OFFSET "+pageNumber*LIMIT;
        var query = connection.query(sql,function(err, results) {
            console.log(query.sql);
            connection.release();
            if(err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(err, results);
        });
    });
};

module.exports.getAUserData = function(userId,callback){
    dbPool.getConnection(function(err,connection){
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        var sql = "SELECT * FROM users WHERE id = ? ";
        var query = connection.query(sql,userId,function(err, results) {
            console.log(query.sql);
            connection.release();
            if(err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(err, results);
        });
    });
};

module.exports.createAnUserInDatabase = function(firstName,lastName,callback){
    var user={
        firstname : firstName,
        lastname : lastName,
    };
    dbPool.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        connection.beginTransaction(function(err) {
            if (err) {
                console.log(err);
                connection.release();
                callback(err);
                return;
            }
            var sql = 'INSERT INTO users SET ? ';
            var query = connection.query(sql, user, function(err, results) {
                console.log(query.sql);
                if(err) {
                    connection.rollback(function(err) {
                        console.log("rollback err "+err);
                        connection.release();
                        callback(true);
                        return;
                    });
                }
                else {
                    connection.commit(function (err) {
                        if (err) {
                            connection.rollback(function (err) {
                                console.log(err);
                                connection.release();
                                callback(true);
                                return;
                            });
                        }
                        else {
                            connection.release();
                            console.log('success!');
                            callback(err, results);
                        }
                    });
                }
            });
        });
    });
}