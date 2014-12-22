'use strict';

var db = require('../lib/db');

module.exports = function (router) {

    router.get('/', function (req, res) {
        // Get the cart from session
        var cart = req.session.cart,
            displayCart = {
                items: [],
                total: 0
            },
            total = 0;

        // ready the produts for display
        for (var item in cart) {
            displayCart.items.push(cart[item]);
            total += (cart[item].qty * cart[item].price);
        }

        // total the values
        displayCart.total = total;

        // render the cart with a model


        res.render('cart/index', { cart: displayCart });
    });


    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        db
            .Products
            .filter('it.id == id', { id: req.params.id })
            .single(null, null, function (product) {
                if (cart[req.params.id]) {
                    cart[req.params.id].qty++;
                } else {
                    cart[req.params.id] = {
                        title: product.title,
                        price: product.price,
                        qty: 1
                    };
                }

                res.redirect('/cart');
            });
    });
};
