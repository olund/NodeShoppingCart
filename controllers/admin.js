'use strict';


var db = require('../lib/db');
var User = require('../models/user');
var Product = require('../models/product');
var passwordHash = require('password-hash');
var auth = require('../lib/auth');

module.exports = function (router) {
    router.all('/*', auth.authenticate('admin'));

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

    router.get('/users', function (req, res) {
        db
            .Users
            .toArray(function (users) {
                res.render('admin/users', { users: users });
            });
    });

    router.post('/users/', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = passwordHash.generate(req.body.password);
        user.role = req.body.role;

        db.Users.add(user);
        db.saveChanges(function () {
            res.redirect('/admin/users');
        });
    });

    router.delete('/users/:id', function (req, res) {
        db
            .Users
            .filter('it.id == id', { id: req.params.id })
            .removeAll()
            .then(function() {
                res.redirect('/admin/users');
            });
    });

    router.get('/users/:id', function (req, res) {
        db
            .Users
            .filter('it.id == id', { id: req.params.id })
            .single(null, null, function (user) {
                res.render('admin/user', { user: user });
            });
    });

    router.put('/users/:id', function (req, res) {
        var user = db.Users.attachOrGet({ id: req.params.id });
        user.username = req.body.username;
        user.password = req.body.password;
        user.role   = req.body.role;

        db.saveChanges().then(function() {
            res.redirect('/admin/users');
        });
    });

};
