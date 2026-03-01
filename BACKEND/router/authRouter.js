const express = require('express');
const authController = require('../controller/authController.js')
const authRouter = express.Router();


authRouter.post('/signup',  authController.signup)
authRouter.post('/comment', authController.comment)

module.exports = authRouter;
