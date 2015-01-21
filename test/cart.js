/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
express = require('express'),
request = require('supertest'),
models = require('../models');


describe('/admin', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should say "Cart"', function (done) {
        request(mock)
            .get('/cart')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/cart/)

            .end(function (err, res) {
                done(err);
            });
    });


    /*it('should update the cart', function (done) {
        request(mock)
            .put('/cart/41')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });*/
});
