'use strict';
var $data = require('jaydata');

var user = function UserModel() {
    $data.Class.define('User', $data.Entity, null, {
        id: {
            type: 'id',
            key: true,
            computed: true,
            nullable: false
        },
        username: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' }
    }, null);
    /* jshint ignore:start */
    return User;
    /* jshint ignore:end */
};

module.exports = user();
