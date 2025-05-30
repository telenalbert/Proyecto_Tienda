'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        foreignKey: "productId",
        as: "Categories"
      })
      // define association here
    }
  }
  Product.init({
    nameProduct: DataTypes.STRING,
    descriptionProduct: DataTypes.STRING,
    price: DataTypes.FLOAT,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};