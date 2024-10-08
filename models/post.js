'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment)
      Post.belongsTo(models.Profile)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    imageUrl: DataTypes.TEXT,
    caption: DataTypes.TEXT,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};