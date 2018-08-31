'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  article.associate = function(models) {
    // associations can be defined here
    models.article.belongsTo(models.user);
    models.article.hasMany(models.comment);
    models.article.belongsToMany(models.tag, {through: 'articleTag'});
  };
  return article;
};