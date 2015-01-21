'use strict';

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL(10,2),
        image: DataTypes.STRING,
        slug: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Product.belongsTo(models.Category);
            }
        }
    });

    return Product;
};
