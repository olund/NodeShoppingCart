'use strict';

var models = require('../models');

module.exports = function () {
    return function (req, res, next) {
        models.Category.findAll().then(function (categories) {
            res.locals.cat = categories;
            res.locals.cart = req.session.cart || false;
            next();
        });
    };
};