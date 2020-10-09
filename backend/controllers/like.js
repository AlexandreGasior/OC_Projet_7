const Like = require('../models/Like');

exports.moderateLikes = (req, res, next) => {
    Like.findOne({ where: { postId: req.params.id, userId: req.body.userId } })
        .then(like => {
            if (like === undefined) {
                if (req.body.likes == 1) {
                    Like.create()
                        .then(() => res.status(201).json({ message: 'Vous aimez ce post' }))
                        .catch(error => res.status(400).json({ error }));
                } else {
                    res.status(403).json({ message: 'Vous ne pouvez pas annuler votre like' })
                }
            } else {
                if (req.body.likes == 0) {
                    Like.destroy({ where: { liker_Id: req.body.userId, post_Id: req.params.id } })
                        .then(() => { res.status(200).json({ message: "Like supprimé" }) })
                        .catch(error => res.status(400).json({ error }));
                } else {
                    res.status(403).json({ message: 'Vous ne pouvez pas ajouter de like à ce post' })
                }
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.getLikesfromPost = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.id } })
        .then(likes => res.status(200).json(likes))
        .catch(error => res.status(400).json({ error }));
};