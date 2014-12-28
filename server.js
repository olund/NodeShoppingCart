'use strict';

var app = require('./index');
var http = require('http');
var models = require('./models');


var server;

/*
 * Create and start HTTP server.
 */

models.sequelize.sync().then(function () {
    server = http.createServer(app);
    server.listen(process.env.PORT || 8000);
    server.on('listening', function () {
        console.log('Server listening on http://localhost:%d', this.address().port);
    });
});