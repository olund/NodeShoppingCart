'use strict';

var models = require('../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
        models.Category.findAll({
            include: [ models.Product ],
            limit: 9,
        }).then(function(categories) {
            res.render('products/index', {
                categories: categories
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
            include: [ models.Product ]
        }).then(function(categories) {

            if (req.query.list) {
                url = '/products/' + req.params.category;
                template = 'products/products';
            }

            console.log('template!!!!', template);

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
