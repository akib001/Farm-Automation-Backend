const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const User = require('../models/m_user');

exports.fetchConsumersList = async (req, res, next) => {
    try {
        const consumers = await User.find({role: 'consumer'}, {
            name: 1,
            mobile: 1,
            division: 1,
            district: 1,
            upazila: 1,
            village: 1,
            demand: 1,
            quantity: 1,
        })

        console.log('FIND RESULTS', consumers);

        res.status(200).json({
            message: 'Consumers List successfully.',
            consumers: consumers,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postFarmData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const {temp, humidity, moisture, light} =
        req.body;

    const farmData = new Farm({
        temp, humidity, moisture, light
    });

    try {
        await farmData.save();

        res.status(201).json({
            message: 'Farm data created successfully!',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};