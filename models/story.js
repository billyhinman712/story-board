'use strict';
module.exports = (sequelize, DataTypes) => {
  var story = sequelize.define('story', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  story.associate = function(models) {
    // associations can be defined here
    models.story.belongsTo(models.user);
    models.story.hasMany(models.comment);
    models.story.belongsToMany(models.tag, {through: 'storyTag'});
  };
  return story;
};