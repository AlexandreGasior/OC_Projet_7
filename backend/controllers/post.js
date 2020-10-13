const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: sequelize.literal('(createdAt) DESC'),
        include: [{ model: User }]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    Post.create({
        userId: req.body.userId,
        content: req.body.content,
        likes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
        .then(() => res.status(201).json({ message: 'Post créé' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post supprimé ! " }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }))
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }, include: [{ model: User }] })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    if (req.file) {
        let PostObject = {
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        Post.findOne({ where: { id: req.params.id } })
            .then(post => {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.update({
                        ...PostObject
                    },
                        {
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => res.status(200).json({ message: "Post modifié !" }))
                        .catch(error => res.status(400).json({ message: "Le post n'a pas pu être modifié" + error }));
                })
            })
            .catch(error => console.log("Post non trouvé", error))

    } else {
        Post.update({
            content: req.body.content
        },
            {
                where: {
                    postId: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: "Post modifié !" }))
            .catch(error => res.status(400).json({ message: "Le post n'a pas pu être modifié" + error }));
    }
};