'use strict';

var db = require('../lib/db'),
    VideosModel = require('../models/videos');


module.exports = function (router) {

    router.get('/', function (req, res) {
        db.Products.toArray(function (products) {
            res.render('videos/index', { products: products });
        });
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
