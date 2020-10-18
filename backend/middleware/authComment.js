require('dotenv').config();
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const userRole = decodedToken.userRole;
    const userId = decodedToken.userId;
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(comment => {
        if((comment.userId === userId) || userRole === 'admin'){
            next();
        }
        else{
            res.status(401).json({message: 'Action non autorisée'})
        }
    })
    .catch(error => res.status(500).json({error}))
}