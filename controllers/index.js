'use strict';

var models = require('../models');

module.exports = function (router) {

    router.get('/', function (req, res) {

        /*models.User.findAll().then(function(users) {
            console.log(users);
            res.render('index');
        });*/

        models.Category.findAll({
            include: [ models.Product ]
        }).then(function(categories) {
            console.log(categories);
            res.render('index', {
                categories: categories
            });
        });
    });

};
