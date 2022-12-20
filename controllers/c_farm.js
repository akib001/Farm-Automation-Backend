const {validationResult} = require('express-validator/check');
const Farm = require('../models/m_farm');

exports.getSingleFarmData = async (req, res, next) => {
    const farmerId = req.params.farmerId;
    try {
        const farmData = await Farm.findOne({farmer_id: farmerId})

        if (!farmData) {
            const error = new Error('Not a single farm Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Fetched latest farm data',
            data: farmData,
            updatedAt: farmData?.updatedAt
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllFarmData = async (req, res, next) => {
    const farmerId = req.params.farmerId;
    try {
        const farmData = await Farm.find({farmer_id: farmerId})


        if (farmData?.length < 1) {
            const error = new Error('No farm Data Found');
            error.statusCode = 404;
            throw error;
        }

        console.log('farmData', farmData)
        res.status(200).json({
            message: 'Fetched all farm data',
            data: farmData,
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
