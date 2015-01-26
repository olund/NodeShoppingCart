'use strict';

var passwordHash = require('password-hash'),
    auth = require('../lib/auth'),
    models = require('../models'),
    slug = require('slug'),
    fs = require('fs');

module.exports = function (router) {
    router.all('/*', auth.authenticate('admin'));

    router.get('/', function (req, res) {
        res.render('admin/index', { admin: true, messages: req.flash() });
    });

    /*
        Products -----------------------
     */

    /**
     * GET /admin/products
     * Get all the categories and products
     */
    router.get('/products', function (req, res) {
        models.Category.findAll({
            include: [models.Product]
        }).then(function(category) {
            if (req.xhr) {
                res.send(JSON.stringify(category));
            } else {
                res.render('admin/products', {
                    title: 'Admin - Products',
                    categories: category,
                    //messages: req.flash(),
                });
            }

        });
    });

    router.post('/products', function (req, res) {
        fs.readFile(req.files.file.path, function(err, data) {
            var filepath = __dirname + '/../public/images/products/' + req.files.file.name;
            fs.writeFile(filepath, data, function(err) {
                if (!!err) {
                    console.log(err);
                }
                models.Product.create({
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    slug: slug(req.body.title),
                    CategoryId: req.body.category,
                    image: '/images/products/' + req.files.file.name,
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
                var found = false,
                    current = {};

                for (var i = 0; i < categories.length && !found; i++) {
                    if (categories[i].id === product.CategoryId) {
                        found = true;
                        current = {
                            id: categories[i].id,
                            title: categories[i].title
                        };
                    }
                }

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
        models.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            req.flash('info', 'Deleted the product');
            res.redirect('/admin/products');
        });
    });

    /*
        USERS -----------------------
     */
    router.get('/users', function (req, res) {
        models.User.findAll().then(function (users) {
            if (req.xhr) {
                res.send(JSON.stringify(users));
            } else {
                res.render('admin/users', { users: users });
            }
        });
    });

    router.post('/users/', function (req, res) {
        models.User.create({
            username: req.body.username,
            password: passwordHash.generate(req.body.password),
            role: req.body.role,
        }).complete(function(err, product) {
            if (!!err) {
                req.flash('warning', 'Something went wrong...');
                console.log(err);
            } else {
                req.flash('success', 'User added!');
                res.redirect('/admin/users');
            }
        });
    });

    router.delete('/users/:id', function (req, res) {
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            req.flash('info', 'Deleted the user');
            res.redirect('/admin/users');
        });
    });


    // TODO:
    router.get('/users/:id', function (req, res) {

    });

    // TODO
    router.put('/users/:id', function (req, res) {

    });

    /*
        Categories -----------------------
     */
    router.get('/categories', function (req, res) {
        models.Category.findAll({
            order: 'id DESC'
        }).then(function (categories) {
            if (req.xhr) {
                res.send(JSON.stringify(categories));
            } else {
               res.render('admin/categories', {
                    categories: categories,
                    messages: req.flash()
                });
            }
        });
    });

    router.post('/categories', function (req, res) {
        models.Category.create({
            title: req.body.title,
            slug: slug(req.body.title),
        }).complete(function(err, product) {
            if (!!err) {
                req.flash('warning', 'Something went wrong...');
                console.log(err);
            } else {
                req.flash('success', 'Category added!');
                res.redirect('/admin/categories');
            }
        });
    });

    router.get('/categories/:id', function (req, res) {
        models.Category.find({
            where: {
                id: req.params.id
            }
        }).then(function (category) {
            res.render('admin/category', {
                category: category
            });
        });
    });

    router.put('/categories/:id', function (req, res) {
        models.Category.update({
            title: req.body.title,
            slug: slug(req.body.title)
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (rowsAffected) {
            req.flash('success', 'Category edited, affected rows: ' + rowsAffected);
            res.redirect('/admin/categories/' + req.params.id);
        });
    });

    router.delete('/categories/:id', function (req, res) {
        models.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            req.flash('info', 'Deleted the category');
            res.redirect('/admin/categories');
        });
    });

};
