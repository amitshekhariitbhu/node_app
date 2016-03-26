/**
 * Created by amitshekhar on 27/03/16.
 */

module.exports.getUserData = function(callback){
    dbPool.getConnection( function(err, connection) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        var sql = "SELECT * FROM users";
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