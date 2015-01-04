'use strict';

var models = require('../models'),
    auth = require('../lib/auth');


module.exports = function (router) {
    router.all('/*', auth.authenticate());

    router.get('/', function (req, res) {
        /*models.User.find({
            where: {
                id:
            }
        })*/
        res.send(req.session.user);
    });
};