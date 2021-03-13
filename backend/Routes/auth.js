const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')


// @route   POST api/auth/register
// @desc    Register User
// @access  Public
router.route('/register')
    .post(authController.register)

// @route   POST api/auth/login
// @desc    Login User
// @access  Public
router.route('/login')
    .post(authController.login)


// @route   POST api/auth/refresh-token
// @desc    Login User
// @access  Public
router.route('/refresh-token')
    .post(authController.refreshToken)


// @route   DELETE api/auth/logout
// @desc    Login User
// @access  Public
router.route('/logout')
    .delete(authController.logout)



module.exports = router;