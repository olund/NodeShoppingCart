'use strict';


var VideosModel = require('../../models/videos');


module.exports = function (router) {

    var model = new VideosModel();


    router.get('/', function (req, res) {
        res.render('index', model);
    });

};
