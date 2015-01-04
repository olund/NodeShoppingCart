'use strict';
var models = require('../models'),
    passwordHash = require('password-hash');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('register', { messages: req.flash() });
    });

    router.post('/', function (req, res) {
        db
            .Users
            .filter('it.username == username', { username: req.body.username })
            .first(null, null, function (user) {
                // Already exist.
                req.flash('error', 'A user with that username already exist');
                res.redirect('/register');
            }).fail(function () {
                var user = new User();
                user.username = req.body.username;
                user.password = passwordHash.generate(req.body.password);
                user.role = 'user';

                db.Users.add(user);
                db.saveChanges(function () {
                    // Login the user.
                    req.session.user = user;
                    res.redirect('/');
                });
            });
    });
};