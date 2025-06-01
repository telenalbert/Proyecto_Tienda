'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Order)
      User.hasMany(models.Token)
      // define association here
    }
  }
  User.init({
    fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Por favor introduce tu nombre"
      },
    },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu correo",
        },
        isEmail: {
          msg: "Por favor introduce un correo valido",
        },
      },
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};