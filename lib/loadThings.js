'use strict';

var models = require('../models');

module.exports = function () {
    return function (req, res, next) {
        models.Category.findAll().then(function (categories) {
            res.locals.cat = categories;
            req.session.cart = req.session.cart || {};
            res.locals._cart = req.session.cart || false;
            res.locals._user = req.session.user || false;
            if (req.user && typeof req.user.user.role !== 'undefined') {
                res.locals._admin = req.session.user.role === 'admin' ? true : false;
            }
            next();
        });
    };
};