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
    static associate({TypeOfProduct, Users, ShopCard}) {
      this.belongsTo(TypeOfProduct, {foreignKey: 'productTypeId', as: 'product'});
      this.belongsToMany(Users, {through:"ShopCard", as:"products", foreignKey:"productId"})
      this.hasMany(ShopCard, {foreignKey:"productId"})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    imgUrl: DataTypes.STRING,
    rowNum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};