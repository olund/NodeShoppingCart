'use strict';
var models = require('../models');

module.exports = function (router) {
    router.get('/', function (req, res) {
        var data = [];
        models.Product.findAll({
            where: {
                title: {
                    like: '%' + req.query.key + '%'
                },
            },
            limit: 10
        }).then(function (products) {

            // GET category
            var found = false,
                category;

            products.forEach(function (element, i) {
                if (element.CategoryId === res.locals.cat[i].id) {
                    category = res.locals.cat[i].slug;
                    found = true;
                }
            });

            products.forEach(function(element, i) {
                data.push({
                    value: element.title,
                    href: '/products/' + category + '/' + element.slug
                });
            });

            res.send(JSON.stringify(data));
        });
    });
};