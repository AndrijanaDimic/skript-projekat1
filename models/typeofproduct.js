'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeOfProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      this.hasMany(Product, {foreignKey: 'productTypeId', as: 'typeOfProducts', onDelete: 'cascade',hooks : true });
    }
  };
  TypeOfProduct.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeOfProduct',
  });
  return TypeOfProduct;
};