const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

const app = express();

// Database connection
const sequelize = require('./database');

// CORS (Cross Origin Ressource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Testing the connection
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

// Using body-parser for content-type : application/json
app.use(bodyParser.json());

// Using path to save the images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);


//-----------------------------------------------------
//-----------------------------------------------------
const User = require('./models/User');

async function test() {
    await sequelize.sync({
        force: true
    });
    const user1 = await User.create({
        firstName: 'Paul',
        lastName: 'McCartney',
        email: 'paupaul@mc.cartney',
        password: 'azerty1'
    })
    const user2 = await User.create({
        firstName: 'Hughe',
        lastName: 'Aufraise',
        email: 'hugue@mc.fraise',
        password: 'azerty1'
    })
    await user1.createPost({
        content: 'Contenu numéro UNO',
        imageUrl: 'une super URL'
    });
    await user1.createPost({
        content: 'Contenu numéro DOS',
        imageUrl: 'une super URL again'
    });
    await user2.createPost({
        content: 'Contenu numéro UNO mais du petit Hughe',
        imageUrl: 'URL de BG'
    });
    await user1.createComment({
        postId: 2,
        content: 'wesh C Tro ouf'
    });
    await user2.createComment({
        postId: 2,
        content: 'ta tro raison'
    });
    await user2.createLike({
        postId: 2,
    });
}

test();
//-----------------------------------------------------
//-----------------------------------------------------


// Export
module.exports = app;