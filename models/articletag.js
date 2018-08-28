'use strict';
module.exports = (sequelize, DataTypes) => {
  var articleTag = sequelize.define('articleTag', {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  articleTag.associate = function(models) {
    // associations can be defined here
  };
  return articleTag;
};