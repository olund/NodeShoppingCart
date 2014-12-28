'use strict';

var $data = require('jaydata'),
    Product = require('../models/product'),
    User = require('../models/user');


var db = function() {
    $data.Class.defineEx('Database', [$data.EntityContext, $data.ServiceBase], null, {
        Products: {
            type: $data.EntitySet,
            elementType: Product
        },
        Users: {
            type: $data.EntitySet,
            elementType: User
        }
    });
    /* jshint ignore:start */
    return new Database({
        name: 'mongoDB',
        databaseName: 'NodeShoppingCart',
        address: 'localhost',
        port: 27017
    });
    /* jshint ignore:end */
};

/*module.exports = db();*/