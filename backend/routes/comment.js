const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const authComment = require('../middleware/authComment');

router.post('/create/:id', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getCommentsfromPost);
router.delete('/:id', auth, authComment, commentCtrl.deleteComment);
router.post('/:id', auth, authComment, commentCtrl.modifyComment);

module.exports = router;