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
      }),
      Product.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "Orders"
      });
    }
  }

 Product.init({
    nameProduct: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el nombre del producto",
        },
      },
    },
    descriptionProduct:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:  {
          msg: "Por favor introduce la descripción",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Por favor introduce el precio",
        },
        isFloat: {
          msg: "El precio deber ser un número",
        }
      }
    },
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};