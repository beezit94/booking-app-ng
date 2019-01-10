var express = require('express');
var router = express.Router();
var UserController = require('../controller/user');

router.get('/:id', UserController.checkAuth, UserController.getUser);
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
