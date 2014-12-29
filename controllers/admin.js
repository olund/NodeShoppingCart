'use strict';


var db = require('../lib/db'),
    User = require('../models/user'),
    Product = require('../models/product'),
    passwordHash = require('password-hash'),
    auth = require('../lib/auth'),
    models = require('../models'),
    slug = require('slug');


module.exports = function (router) {
    //router.all('/*', auth.authenticate('admin'));

    router.get('/', function (req, res) {
        res.render('admin/index', { admin: true });
    });

    /**
     * GET /admin/products
     * Get all the categories and products
     */
    router.get('/products', function (req, res) {
        models.Category.findAll({
            include: [models.Product]
        }).then(function(category) {
            res.render('admin/products', {
                title: 'Admin - Products',
                categories: category,
                messages: req.flash(),
            });
        });
    });

    router.post('/products', function (req, res) {
        models.Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: slug(req.body.title),
            CategoryId: req.body.category
        }).complete(function(err, product) {
            if (!!err) {
                req.flash('warning', 'Something went wrong...');
                console.log('SOMETHING WENT WRONG', err);
            } else {
                req.flash('success', 'Product added!');
                res.redirect('/admin/products');
            }
        });
    });

    /**
     * GET /admin/products/:id,
     * Get a product product.
     */
    router.get('/products/:id', function (req, res) {
        // Get categories
        models.Category.findAll().then(function (categories) {
            // Get products
            models.Product.find({
                where: {
                    id: req.params.id
                }
            }).then(function (product) {
                // Get the current category for displaying it easier.
                var current = {
                    id: categories[product.CategoryId-1].id,
                    title: categories[product.CategoryId-1].title
                };
                res.render('admin/product', {
                    messages: req.flash(),
                    current: current,
                    categories: categories,
                    product: product
                });
            });
        });
    });

    /**
     * PUT /admin/products/:id
     * Update a product
     */
    router.put('/products/:id', function (req, res) {
        // Update a product
        models.Product.update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            slug: slug(req.body.title),
            CategoryId: req.body.category
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (c) {
            //TODO: ERROR handling
            req.flash('success', 'Product edited, affected rows: ' + c);
            res.redirect('/admin/products/' + req.params.id);
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
                //res.render('admin/users', { users: users });
                res.send(JSON.stringify(users));
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
