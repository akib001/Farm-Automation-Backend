const express = require('express');

const farmerController = require('../controllers/c_farmer');

const router = express.Router();

// GET /farmer/fetch-consumers-list
router.get('/fetch-consumers-list', farmerController.fetchConsumersList);


module.exports = router;
