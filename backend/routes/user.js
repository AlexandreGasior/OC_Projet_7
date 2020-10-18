const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users/:id', auth, userCtrl.getOneUser);
router.delete('/users/:id', auth, userCtrl.deleteUser);
router.post('/users/:id', auth, userCtrl.modifyUser);
router.get('/auth', auth, userCtrl.authenticate);

module.exports = router;