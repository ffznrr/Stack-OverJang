'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Comment)
      Profile.hasMany(models.Post)
    }

    get profileCode(){
      return `${this.username}-${this.UserId}`
    }
  }
  Profile.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notEmpty: {msg: 'Username cannot be empty!'}
      }
    },
    profileImg: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    bio:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notEmpty: {msg: 'Bio cannot be empty!'}
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};