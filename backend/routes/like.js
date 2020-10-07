const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.put('/:id', auth, likeCtrl.moderateLikes)
router.get('/:id', auth, likeCtrl.getLikesfromPost);

module.exports = router;