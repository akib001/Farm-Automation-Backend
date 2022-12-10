const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const Farm = require('../models/m_farm');

exports.getTemp = async (req, res, next) => {
    try {
        const farmData = await Farm.findOne({})

        res.status(200).json({
            message: 'Fetched latest temperature',
            temp: farmData.temp,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getHumidity = async (req, res, next) => {
    try {
        const farmData = await Farm.findOne({})
        res.status(200).json({
            message: 'Fetched latest Humidity',
            temp: farmData.humidity,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.getMoisture = async (req, res, next) => {
    try {
        const farmData = await Farm.findOne({})

        res.status(200).json({
            message: 'Fetched latest Moisture',
            temp: farmData.moisture,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.getLight = async (req, res, next) => {
    try {
        const farmData = await Farm.findOne({})

        res.status(200).json({
            message: 'Fetched latest Light',
            temp: farmData.light,
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