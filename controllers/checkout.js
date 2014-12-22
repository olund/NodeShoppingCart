'use strict';
var auth = require('../lib/auth');


module.exports = function (router) {
    router.get('/', auth.authenticate(), function (req, res) {
        res.render('checkout');
    });
};