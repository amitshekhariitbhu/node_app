/**
 * Created by amitshekhar on 03/03/17.
 */
"use strict";


class Timestamp {

    constructor(year, month = 1, day = 0, hour = 0, min = 0, sec = 0, millisec = 0){
        if(year === undefined){
            this._date = new Date();
        }else{
            this._date = new Date(year, month, day, hour, min, sec, millisec);
        }
    }

    get _date() {
        return this.date;
    }

    set _date(date) {
        this.date = date;
    }

    getYMD() {
        return this._date.getUTCFullYear() + '-'
            + Timestamp.pad(this._date.getUTCMonth() + 1) + '-'
            + Timestamp.pad(this._date.getUTCDate());
    }

    getYMDHMS() {
        return this._date.getUTCFullYear() + '-'
            + Timestamp.pad(this._date.getUTCMonth() + 1) + '-'
            + Timestamp.pad(this._date.getUTCDate()) + ' '
            + Timestamp.pad(this._date.getUTCHours()) + ':'
            + Timestamp.pad(this._date.getUTCMinutes()) + ':'
            + Timestamp.pad(this._date.getUTCSeconds())
    }

    static pad(n) {
        return n < 10 ? '0' + n : n
    }
}


module.exports = Timestamp;