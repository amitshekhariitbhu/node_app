/**
 * Created by amitshekhar on 03/03/17.
 */

const Model = require('./model');

class User extends Model {

    constructor(firstname, lastname) {
        super();
        this._firstname = firstname;
        this._lastname = lastname;
    }

    copy({id, firstname, lastname}) {

        super.copy({id});

        this._firstname = firstname;
        this._lastname = lastname;

        return this;
    }

    static get(id) {
        let sql = 'SELECT * FROM users WHERE id = ? ';
        return super.get(sql, id, this, "User do not exists");
    }

    static getAll() {
        let sql = 'SELECT * FROM users';
        return super.getAll(sql, null, this, "User do not exists");
    }

    /**
     *  offset starts from 0 for the api:
     *  it specifies the rows to fetch after x rows
     *  count specifies the number of rows to fetch from the offset
     */
    static getAsPage(offset, count) {
        var sql = 'SELECT * FROM users LIMIT ' + offset + ',' + count;
        return super.getAll(sql, null, this, "No more to load");
    }

    create() {
        let sql = 'INSERT INTO users SET ? ';
        return super.create(sql, this);
    }

    update() {
        let sql = 'UPDATE users SET ?  WHERE id = ?';
        return super.update(sql, [this.clean(), this._id]);
    }

    remove() {
        let sql = 'DELETE FROM users WHERE id = ? ';
        return super.remove(sql, this);
    }

    get _firstname() {
        return this.firstname
    }

    set _firstname(firstname) {
        this.firstname = firstname;
    }

    get _lastname() {
        return this.lastname;
    }

    set _lastname(lastname) {
        this.lastname = lastname;
    }

}

module.exports = User;