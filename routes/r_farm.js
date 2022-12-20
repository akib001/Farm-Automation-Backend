const express = require('express');

const farmController = require('../controllers/c_farm');

const router = express.Router();

// GET /farm/get-single-farm-data/:farmerId
router.get('/get-single-farm-data/:farmerId', farmController.getSingleFarmData);

// GET /farm/get-all-farm-data/:farmerId
router.get('/get-all-farm-data/:farmerId', farmController.getAllFarmData);

router.post('/create-farmdata', farmController.postFarmData);

module.exports = router;

