/**
 * Created by amitshekhar on 03/03/17.
 */
'use strict';

const app = require('express')();

class Debug {

    constructor() {

        if (app.get('env') === 'production') {
            this._enabled = false;
        } else {
            this._enabled = true;
        }
    }

    set _enabled(enabled) {
        this.enabled = enabled;
    }

    get _enabled() {
        return this.enabled;
    }

    log(...args) {

        if (this._enabled) {
            let msg = "";

            for (let i of args) {
                msg += `${i} `;
            }

            console.log(msg)
        }
    }

    logAsJSON(...args) {

        if (this._enabled) {
            let msg = "";

            for (let i of args) {
                try {
                    msg += JSON.stringify(i) + "\n";
                }catch(err) {

                }
            }

            console.log(msg)
        }
    }
}

module.exports = Debug;