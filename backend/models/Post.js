const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = require('../models/User');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.hasMany(Post, { constraints: true, onDelete: 'CASCADE' });
Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

module.exports = Post;