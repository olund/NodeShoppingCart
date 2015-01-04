'use strict';
var models = require('../models'),
    passwordHash = require('password-hash');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('register', { messages: req.flash() });
    });

    router.post('/', function (req, res) {
        models.User.find({
            where: {
                username: req.body.username
            },
            limit: 1
        }).then(function (user) {
            if (user) {
                console.log('KOM HIT', user);
                // A user already been found, can't create a new account
                req.flash('error', 'A user with that username already exist');
                res.redirect('/register');
                return;
            }

            // If the search fails we can create the new user.
            models.User.create({
                username: req.body.username,
                password: passwordHash.generate(req.body.password),
                role: 'user'
            }).complete(function (err, user) {
                // Login the user and redirect.
                req.session.user = user;
                res.redirect('/dashboard');
            });
        });
    });
};