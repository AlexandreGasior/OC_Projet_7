const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authPost = require('../middleware/authPost');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/create', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, authPost, postCtrl.deletePost);
router.post('/:id', auth, authPost, multer, postCtrl.modifyPost);

module.exports = router;