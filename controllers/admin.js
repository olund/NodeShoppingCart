'use strict';


var db = require('../lib/db');

//var AdminModel = require('../../models/admin');
var Product = require('../models/product');

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

    router.get('/products/:id', function (req, res) {
        db
            .Products
            .filter('it.id == id', { id: req.params.id })
            .single(null, null, function (product) {
                res.render('admin/product', { product: product });
            });
    });

    router.post('/products/:id', function (req, res) {
        console.log('POST products with id');
        var product = db.Products.attachOrGet({ id: req.params.id });
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.teaserUrl = req.body.teaserUrl;

        db.saveChanges().then(function () {
            res.redirect('/admin/products');
        });
    });

    router.delete('/products/:id', function (req, res) {
        db
            .Products
            .filter('it.id == id', { id: req.params.id })
            .removeAll()
            .then(function () {
                res.redirect('/admin/products');
            });
    });

};
