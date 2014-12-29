'use strict';

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Category.hasMany(models.Product)
            }
        }
    });

    return Category;
};