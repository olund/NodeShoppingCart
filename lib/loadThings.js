'use strict';

var models = require('../models');

module.exports = function () {
    return function (req, res, next) {
        models.Category.findAll().then(function (categories) {
            // Load things into res.locals

            // Load categories
            res.locals.cat = categories;

            // Load cart
            var cart = req.session.cart || {},
                displayCart = {
                    items: [],
                    total: 0,
                },
                total = 0,
                nrOfItems = 0;
            for (var item in cart) {
                displayCart.items.push(cart[item]);
                total += (cart[item].qty * cart[item].price);
                nrOfItems += cart[item].qty;
            }
            displayCart.total = total;
            displayCart.nrOfItems = nrOfItems;
            res.locals._cart = displayCart || false;


            // load user
            res.locals._user = req.session.user || false;
            if (req.user && typeof req.user.user.role !== 'undefined') {
                res.locals._admin = req.session.user.role === 'admin' ? true : false;
            }
            next();
        });
    };
};