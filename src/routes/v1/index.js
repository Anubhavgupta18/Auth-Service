const userController = require('../../controllers/user-controller');
const { authRequestValidator } = require('../../middlewares/auth-request-validator');
const express = require('express');

const router = express.Router();

router.post('/signup', authRequestValidator,userController.create);
router.post('/signin', authRequestValidator,userController.signin);
router.get('/isauthenticated', userController.isAuthenticated);

module.exports = router;