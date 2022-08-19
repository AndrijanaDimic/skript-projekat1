'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Users }) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
    }
  };
  Order.init({
    price: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};