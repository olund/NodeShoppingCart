'use strict';

var models = require('../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
        models.Category.findAll({
            include: [ models.Product ]
        }).then(function(categories) {
            res.render('products/index', {
                categories: categories
            });
        });
    });


    router.get('/:category', function (req ,res) {
        models.Category.find({
            where: {
                slug: req.params.category
            },
            include: [ models.Product ]
        }).then(function(categories) {
            res.render('products/products', {
                categories: categories
            });
        });
    });

    router.get('/:categories/:title', function (req, res) {
        models.Product.find({
            where: {
                slug: req.params.title
            }
        }).then(function (product) {
            res.render('products/product', {
                product: product
            });
        });
    });

    /*router.get('/:id', function (req, res) {
        db
            .Products
            .filter('it.id == id', { id: req.params.id} )
            .single(null, null, function (product) {
                res.render('videos/product', { product: product });
            });
    });*/

};
