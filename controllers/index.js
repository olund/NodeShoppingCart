'use strict';

var models = require('../models');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/installation', function (req, res) {
        res.render('installation');
    });



    router.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    });
};
