'use strict';

var models = require('../models');

module.exports = function (router) {
    router.get('/', function (req, res) {
        console.log(req.session.user);
        console.log(res.locals._user);
        res.render('index');
    });

    router.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    });
};
