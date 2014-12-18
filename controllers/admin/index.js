'use strict';


var db = require('../../lib/db');

//var AdminModel = require('../../models/admin');
//var Product = require('../../models/product');

module.exports = function (router) {

    router.get('/products', function (req, res) {
        db.Products.toArray(function(products) {
            res.render('admin/products', {
                title: 'Admin - Products',
                products: products
            });
        });
    });

    router.post('/products', function (req, res) {
        var product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.date = new Date().toString();
        product.category = req.body.category;
        product.teaserUrl = req.body.teaserUrl;

        db.Products.add(product);

        db.saveChanges().then(function() {
            res.redirect('/admin/products');
        });
    });

};
