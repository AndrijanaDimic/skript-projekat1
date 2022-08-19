'use strict';
const {
  Model
} = require('sequelize');
const productcategory = require('./productcategory');
module.exports = (sequelize, DataTypes) => {
  class TypeOfProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, ProductCategory}) {
      this.hasMany(Product, {foreignKey: 'productTypeId', as: 'typeOfProducts', onDelete: 'cascade',hooks : true });
      this.belongsTo(ProductCategory, {foreignKey: 'productCategoryId', as: 'productType'});
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