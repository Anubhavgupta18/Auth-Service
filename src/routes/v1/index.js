const userController = require('../../controllers/user-controller');
const { authRequestValidator,adminRequestValidator } = require('../../middlewares/auth-request-validator');
const express = require('express');

const router = express.Router();

router.post('/signup', authRequestValidator,userController.create);
router.post('/signin', authRequestValidator,userController.signin);
router.get('/isAuthenticated', userController.isAuthenticated);
router.get('/isAdmin', adminRequestValidator, userController.isAdmin);

module.exports = router;