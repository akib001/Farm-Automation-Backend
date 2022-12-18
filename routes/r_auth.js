const express = require('express');
const {body} = require('express-validator/check');
const isConsumer = require('../middleware/is-consumer');
const isFarmer = require('../middleware/is-farmer')

const authController = require('../controllers/c_auth');

const router = express.Router();

const signupValidation = [
    body('mobile')
        .trim().isLength({min: 11, max: 11})
        .withMessage('Please enter a valid mobile.'),
    body('password').trim().isLength({min: 5}).withMessage('Please enter a strong password.'),
    body('name').isLength({min: 3, max: 50}).withMessage('Please enter your valid name').trim().not().isEmpty(),
]

const loginValidation = [
    body('mobile')
        .trim().isLength({min: 11, max: 11})
        .withMessage('Please enter a valid mobile.'),
    body('password').trim()
]

// Put => User signup
router.put('/farmer/signup', signupValidation, authController.farmerSignup);

// Post => User Login
router.post('/farmer/login', authController.farmerLogin);

// GET => User Logout
router.get('/user/logout', authController.userLogout);

// Put => Admin signup
router.put('/consumer/signup', signupValidation, authController.consumerSignup);

// Post => Admin Login
router.post('/consumer/login', authController.consumerLogin);

// GET => auth/check-auth
router.get('/check-auth', authController.checkAuth)


module.exports = router;
