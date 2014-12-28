'use strict';

var db = require('../lib/db'),
    IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();


    router.get('/', function (req, res) {

        db
            .Products
            .toArray(function (products) {
                console.log(products);
                res.render('index', { products: products });
            });
    });

};
