const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let buf = Buffer.from(req.body.email).toString('base64');
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: buf,
                password: hash
            })
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    let buf = Buffer.from(req.body.email).toString('base64');
    User.findOne({ where: { email: buf } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.userId,
                        token: jwt.sign(
                            { userId: user.userId },
                            process.env.ACCESS_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { userId: req.params.id } })
        .then(user => { res.status(200).json(user) })
        .catch(error => res.status(404).json({ error }));
}

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { userId: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyUser = (req, res, next) => {
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    },
        {
            where: {
                userId: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
        .catch(error => res.status(400).json({ error }));
}