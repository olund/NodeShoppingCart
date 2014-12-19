'use strict';

var db = require('../lib/db');

module.exports = function (router) {
    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        db
            .Products
            .filter('it.id == id', { id: req.params.id })
            .single(null, null, function (product) {
                if (cart[req.params.id]) {
                    cart.req.params.id
                }
            });
    });
};
