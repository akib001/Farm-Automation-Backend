const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/m_user');

exports.farmerSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const {
        name,
        mobile,
        password,
        division,
        district,
        upazila,
        village,
        daily_production,
        quantity,
        present_store,
        role
    } = req.body;

    try {
        // finding user with same mobile
        const user = await User.findOne({email: mobile});

        // if mobile already exists!
        if (user) {
            if (user.role === 'consumer') {
                const error = new Error('You are already consumer. Please login with your old credentials');
                error.statusCode = 401;
                throw error;
            }

            const error = new Error('Mobile address already exists! ');
            error.statusCode = 401;
            throw error;
        }

        // If no user found with same email
        const hashedpw = await bcrypt.hash(password, 12);

        const newUser = new User({
            name: name,
            mobile: mobile,
            password: hashedpw,
            division: division,
            district: district,
            upazila: upazila,
            village: village,
            daily_production: daily_production,
            quantity: quantity,
            present_store: present_store,
            role: role
        });

        await newUser.save();

        res.status(201).json({message: 'Farmer created!'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.farmerLogin = async (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    let loadedUser;

    try {
        const fetchedUser = await User.findOne({mobile: mobile});
        if (!fetchedUser) {
            const error = new Error('A user with this mobile could not be found.');
            error.statusCode = 401;
            throw error;
        }

        loadedUser = fetchedUser;
        const passwordMatched = await bcrypt.compare(password, fetchedUser.password);

        if (!passwordMatched) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        if (fetchedConsumer.role == 'farmer') {
            const error = new Error("You don't have farmer role");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            mobile: loadedUser.mobile, userId: loadedUser._id.toString(), name: loadedUser.name,
            role: 'farmer',
        }, process.env.accessTokenSecret, {expiresIn: '24h'});

        res
            .status(200)
            .json({
                token: token, userId: loadedUser._id.toString(), name: loadedUser.name, mobile: mobile, role: 'farmer',
            });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.userLogout = async (req, res, next) => {
    try {
        res.clearCookie('token').clearCookie('role');
        res.status(201).json({message: 'User Logout Successfully', logout: true});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.consumerSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const {
        name,
        mobile,
        password,
        division,
        district,
        upazila,
        village,
        demand,
        quantity,
        role
    } = req.body;

    try {
        const fetchedUser = await User.findOne({mobile: mobile});

        // if Mobile address already exists!
        if (fetchedUser) {
            if (fetchedUser.role !== 'farmer') {
                const error = new Error('Mobile already exists in farmer role! ');
                throw error;
            }

            const error = new Error('Mobile address already exists in consumer role! ');
            error.statusCode = 401;
            throw error;
        }

        // If no consumer found with same mobile
        const hashedpw = await bcrypt.hash(password, 12);

        const newConsumer = new User({
            name: name,
            mobile: mobile,
            password: hashedpw,
            division: division,
            district: district,
            upazila: upazila,
            village: village,
            demand: demand,
            quantity: quantity,
            role: role
        });

        await newConsumer.save();

        res.status(201).json({message: 'Consumer created!'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.consumerLogin = async (req, res, next) => {
    const {mobile, password} = req.body;
    let loadedConsumer;

    try {
        const fetchedConsumer = await User.findOne({mobile: mobile});
        if (!fetchedConsumer) {
            const error = new Error('A consumer with this mobile could not be found.');
            error.statusCode = 401;
            throw error;
        }

        if (fetchedConsumer.role !== 'consumer') {
            const error = new Error("You don't have consumer role");
            error.statusCode = 401;
            throw error;
        }

        loadedConsumer = fetchedConsumer;
        const passwordMatched = await bcrypt.compare(password, fetchedConsumer.password);

        if (!passwordMatched) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            mobile: loadedConsumer.mobile, userId: loadedConsumer._id.toString(), name: loadedConsumer.name, // password: password,
            role: 'consumer',
        }, process.env.accessTokenSecret, {expiresIn: '24h'});
        res
            .status(200).json({
            token: token, userId: loadedConsumer._id.toString(), name: loadedConsumer.name, mobile: mobile, role: 'consumer',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// check Token from cookie
exports.checkAuth = async (req, res, next) => {
    let decodedToken;
    let role = false;
    const token = req.user.token;
    if (!token) return res.status(403).json({
        message: 'Not authenticated',
        role,
        email: null,
        userId: null,
        name: null
    });
    try {
        decodedToken = jwt.verify(token, process.env.accessTokenSecret);

        console.log(decodedToken)

        role = decodedToken.role;

        res.status(200).json({
            message: 'Authenticated Successfully',
            role,
            mobile: decodedToken.mobile,
            userId: decodedToken.userId,
            name: decodedToken.name
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 403;
        }
        next(err);
    }
};
