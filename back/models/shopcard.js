'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Product}) {
      this.belongsTo(Product, { foreignKey:"productId"});
      this.belongsTo(Users, {foreignKey:"userId"})
      // define association here

    }
  }
  ShopCard.init({
  }, {
    sequelize,
    modelName: 'ShopCard',
  });
  return ShopCard;
};