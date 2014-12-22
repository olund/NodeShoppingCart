'use strict';

var db = require('../lib/db');
var User = require('../models/user');
var passwordHash = require('password-hash');


module.exports = function (router) {
    router.get('/', function (req, res) {
        console.log(req.flash);
        res.render('login', { messages: req.flash() });
    });

    router.post('/', function (req, res) {
        db
            .Users
            .filter('it.username == username', { username: req.body.username })
            .first(null, null, function (user) {
                if (passwordHash.verify(req.body.password, user.password)) {
                    req.session.user = user;
                    req.flash('info', 'Logged in!');
                    if (req.session.goingTo) {
                        res.redirect(req.session.goingTo);
                        return;
                    }
                    res.redirect('/login');
                    return;
                }
                req.flash('error', 'Username or password is incorrect');
                res.redirect('/login');
            }).fail(function () {
                req.flash('error', 'Username or password is incorrect');
                res.redirect('/login');
            });
    });


};