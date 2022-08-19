'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TypeOfProduct}) {
      this.hasMany(TypeOfProduct, {foreignKey: 'productCategoryId', as: 'poductTypes', onDelete: 'cascade',hooks : true });
    }
  };
  ProductCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};