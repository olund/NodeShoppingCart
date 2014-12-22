'use strict';

var $data = require('jaydata');

var product = function() {

    $data.Class.define('Product', $data.Entity, null, {
        id: { type: 'id', key: true, computed: true, nullable: false },
        title: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'int' },
        category: { type: 'string' },
        teaserUrl: { type: 'string' }
    }, null);
    /* jshint ignore:start */
    return Product;
    /* jshint ignore:end */
};

module.exports = product();