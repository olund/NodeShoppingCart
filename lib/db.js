var $data = require('jaydata');
var Product = require('../models/product');

var db = function() {

    $data.Class.defineEx('Database', [$data.EntityContext, $data.ServiceBase], null, {
        Products: {
            type: $data.EntitySet,
            elementType: Product
        }
    });

    return new Database({
        name: 'mongoDB',
        databaseName: 'NodeShoppingCart',
        address: 'localhost',
        port: 27017
    });
};

module.exports = db();