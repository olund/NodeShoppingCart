'use strict';
var auth = require('../lib/auth');


module.exports = function (router) {
    router.get('/', auth.authenticate(), function (req, res) {
        console.log(req.session.cart);
        res.render('checkout', {
            cart: req.session.cart
        });
    });
};