/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


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


    it('should not be accessible"', function (done) {
        request(mock)
            .get('/admin')
            .expect(302)
            .expect('Content-Type', /html/)

                //.expect(/"name": "index"/)

            .end(function (err, res) {
                done(err);
            });
    });

});
