'use strict';

var models = require('../models'),
    passwordHash = require('password-hash');


module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('login', { messages: req.flash() });
    });

    router.post('/', function (req, res) {
        models.User.find({
            where: {
                username: req.body.username
            },
            limit: 1
        }).then(function (user) {
            if (!user) {
                req.flash('error', 'Username or password is incorrect');
                res.redirect('/login');
            }

            if (passwordHash.verify(req.body.password, user.password)) {
                req.session.user = user;
                req.flash('info', 'Logged in!');

                if (req.session.goingTo) {
                    res.redirect(req.session.goingTo);
                    return;
                }

                if (user.role === 'admin') {
                    res.redirect('/admin');
                    return;
                }

                res.redirect('/dashboard');
                return;
            }

            req.flash('error', 'Username or password is incorrect');
            res.redirect('/login');
        });
    });


};