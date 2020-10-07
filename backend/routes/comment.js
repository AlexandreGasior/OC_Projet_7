const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create/:id', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getCommentsfromPost);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.post('/:id', auth, commentCtrl.modifyComment);

module.exports = router;