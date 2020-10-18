require('dotenv').config();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const userRole = decodedToken.userRole;
    const userId = decodedToken.userId;
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(post => {
        if((post.userId === userId) || userRole === 'admin'){
            next();
        }
        else{
            res.status(401).json({message: "Action non autorisée"})
        }
    })
    .catch(error => res.send("Une erreur est survenue", error))
}