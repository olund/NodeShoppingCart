'use strict';

var models = require('../models'),
    auth = require('../lib/auth');


module.exports = function (router) {
    router.all('/*', auth.authenticate());

    router.get('/', function (req, res) {
        res.render('users/dashboard', {});
    });
};