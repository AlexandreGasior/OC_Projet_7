const Sequelize = require('sequelize');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getCommentsfromPost = (req, res, next) => {
    console.log(req.params.id);
    Comment.findAll({
        where: { postId: req.params.id },
        order: Sequelize.literal('(createdAt) DESC'),
        include: [{ model: User }]
    })

        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.content
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { commentId: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    Comment.update({
        content: req.body.content
    },
        {
            where: {
                commentId: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
        .catch(error => res.status(400).json({ error }));
}