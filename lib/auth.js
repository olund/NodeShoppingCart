'use strict';

var auth = {
    authenticate: function(role) {
        return function (req, res, next) {
            req.session.goingTo = req.originalUrl;

            // Check if the user is logged in.
            if (!req.session.user) {
                req.flash('error', 'login required');
                res.redirect('/login');
                return;
            }

            // Check if the user is allowed to access.
            if (role && req.session.user.role !== role) {
                req.flash('error', 'Not authorized to view that page');
                res.redirect('/login');
                return;
            }

            next();
        };
    },
};

module.exports = auth;