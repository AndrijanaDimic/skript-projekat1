'use strict';
const {
  Model
} = require('sequelize');
const shopcard = require('./shopcard');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate({Product, ShopCard}) {
      // define association here
      // this.hasMany(Messages, { foreignKey: 'userId', as: 'messages', onDelete: 'cascade', hooks: true });
      // this.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'cascade', hooks: true });
      // this.hasMany(ShopCard, { foreignKey: 'userId', as: 'shopCard', onDelete: 'cascade', hooks: true });
       this.belongsToMany(Product, {through: "ShopCard", as: "users", foreignKey:"userId"});
       this.hasMany(ShopCard, {foreignKey:"userId"})
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    role : {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exlude: ['email'] }
    },
    modelName: 'Users',
  });
  return Users;
};