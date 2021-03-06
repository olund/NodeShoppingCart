'use strict';

var models = require('../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
        // Get the cart from session
        var cart = req.session.cart || {},
            displayCart = {
                items: [],
                total: 0,
            },
            total = 0,
            nrOfItems = 0;
        // ready the produts for display
        for (var item in cart) {
            cart[item].id = item;
            displayCart.items.push(cart[item]);

            total += (cart[item].qty * cart[item].price);
            nrOfItems += cart[item].qty;
        }

        // total the values
        displayCart.total = total;
        displayCart.nrOfItems = nrOfItems;

        if (req.xhr) {
            // Send JSON
            res.send(JSON.stringify(displayCart));
        } else {
            // render the cart with a model
            res.render('cart/index', { cart: displayCart });
        }
    });


    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        models.Product.find({
            where: {
                id: req.params.id
            },
            limit: 1,
        }).then(function (product) {
            if (cart[req.params.id]) {
                cart[req.params.id].qty++;
            } else {
                cart[req.params.id] = {
                    title: product.title,
                    price: product.price,
                    qty: 1,
                    image: product.image
                };
            }

            if (req.xhr) {

            } else {
                res.redirect(req.get('referer'));
            }
        });
    });

    router.delete('/all', function (req, res) {
        // Delete the cart
        req.session.cart = {};
        res.redirect('/cart');
    });

    router.delete('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        console.log(cart);

        if (cart[req.params.id]) {
            if (cart[req.params.id].qty === 1) {
                delete cart[req.params.id];
            } else {
                cart[req.params.id].qty--;
            }

        }

        res.redirect(req.get('referer'));
    });
};
