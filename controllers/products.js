'use strict';

var models = require('../models');

module.exports = function (router) {

    function chunk(arr, chunkSize) {
        var R = [];
        for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
        return R;
    }

    router.get('/', function (req, res) {

        models.Product.findAll({
            limit: 9,
            order: 'updatedAt DESC',
        }).then(function (products) {
            // Get categories for every product..
            for (var i = 0; i < res.locals.cat.length; i++) {
                for (var x = 0; x < products.length; x++) {
                    if (res.locals.cat[i].id == products[x].CategoryId) {
                        products[x].category = res.locals.cat[i].slug
                    }
                }
            }

            // Limit description text
            for (var i = 0; i < products.length; i++) {
                products[i].description = products[i].description.substring(0, 250) + '...';
            }

            var chunked = chunk(products, 3);

            res.render('products/index', {
                products: products,
                chunked: chunked,
            });
        });

    });

    router.get('/all', function (req, res) {
        models.Product.findAll({
           // order: 'updatedAt DESC'
        }).then(function (products) {
            var chunked = chunk(products, parseInt(products.length/3+1));

            res.render('products/index', {
                chunked: chunked,
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
