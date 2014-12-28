'use strict';

/**
 * Database
 */

var Sequelize = require('sequelize');

var db = function() {

    var sequelize = new Sequelize('nodeshoppingcart', 'root', 'root', {
        dialect: "mysql",
        port:    8889, //3306
    });

    sequelize
        .authenticate()
        .complete(function(err) {
            if (!!err) {
                console.log('Unable to connect to the database:', err)
            } else {
                console.log('Connection has been established successfully.')
            }
        });

    sequelize.sync({ force: true }).complete(function(err) {
        User.create({
            username: 'john',
            password: '1111',
            email: 'testar@test.com'
        }).complete(function(err, user1) {
            User.find({ username: 'john' }).complete(function(err, user2) {
                console.log(user1.values, user2.values)
            });
        });
    });
};

/*module.exports = db();*/


