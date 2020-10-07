const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = require('../models/User');
const Post = require('../models/Post');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.hasMany(Comment, { constraints: true, onDelete: 'CASCADE' });
Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Post.hasMany(Comment, { constraints: true, onDelete: 'CASCADE' });
Comment.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });

module.exports = Comment;