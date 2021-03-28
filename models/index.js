const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

User.hasMany(Post);

Post.belongsTo(User);

Post.hasMany(Comment);

Comment.belongsTo(User);

Comment.belongsTo(Post);

module.exports = { User, Post, Comment };

