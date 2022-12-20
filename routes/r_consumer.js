const express = require('express');

const farmerController = require('../controllers/c_farmer');

const router = express.Router();

// GET /farmer/fetch-farmers-list
router.get('/fetch-farmers-list', farmerController.fetchFarmersList);


module.exports = router;
