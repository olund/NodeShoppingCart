'use strict';

var models = require('../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log(res.locals._cart, '-----------------------------');

        models.Product.findAll({
            limit: 9,
            order: 'updatedAt DESC',
        }).then(function (products) {
            res.render('products/index', {
                products: products
            });
        });
    });

    router.get('/all', function (req, res) {
        models.Product.findAll({
           // order: 'updatedAt DESC'
        }).then(function (products) {
            res.render('products/index', {
                products: products,
                all: true
            });
        });
    });

    router.get('/:category/', function (req ,res) {
        var url = '/products/' + req.params.category + '?list=1',
            template = 'products/products-gallery';

        models.Category.find({
            where: {
                slug: req.params.category
            },
            order: 'updatedAt DESC',
            include: [ models.Product ]
        }).then(function(categories) {

            if (req.query.list) {
                url = '/products/' + req.params.category;
                template = 'products/products';
            }

            res.render(template, {
                categories: categories,
                url: url,
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
};
