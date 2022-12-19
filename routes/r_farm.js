const express = require('express');

const farmController = require('../controllers/c_farm');

const router = express.Router();

// GET /farm/temp
router.get('/temp', farmController.getTemp);
router.get('/humidity', farmController.getHumidity);
router.get('/moisture', farmController.getMoisture);
router.get('/light', farmController.getLight);

router.get('/all-farm-data', farmController.fetchAllFarmData);

router.post('/create-farmdata', farmController.postFarmData);

module.exports = router;
