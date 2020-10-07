const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = require('../models/User');
const Post = require('../models/Post');

const Like = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

User.hasMany(Like, { constraints: true, onDelete: 'CASCADE' });
Like.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Post.hasMany(Like, { constraints: true, onDelete: 'CASCADE' });
Like.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });

module.exports = Like;