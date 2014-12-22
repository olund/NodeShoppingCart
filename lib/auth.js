'use strict';

var auth = {
    authenticate: function(role) {
        return function (req, res, next) {
            req.session.goingTo = req.originalUrl;

            if (!req.session.user) {
                req.flash('error', 'login required');
                res.redirect('/login');
                return;
            }

            if (role && req.session.user.role !== role) {
                req.flash('error', 'not authorized to view that page');
                res.redirect('/login');
                return;
            }

            next();
        };
    }
};

module.exports = auth;