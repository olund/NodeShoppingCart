'use strict';

var db = require('../lib/db');

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.send('OK');

    });

    router.get('/all', function (req, res) {
        db.Products.toArray(function (products) {
            res.render('videos/index', { products: products });
        });
    });

    router.get('/:category', function (req ,res) {
        res.send(req.params.category);
    });

    router.get('/:id', function (req, res) {
        db
            .Products
            .filter('it.id == id', { id: req.params.id} )
            .single(null, null, function (product) {
                res.render('videos/product', { product: product });
            });
    });

};
