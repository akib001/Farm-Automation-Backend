const express = require('express');

const farmController = require('../controllers/c_farm');

const router = express.Router();

// GET /farmer/fetch-consumers-list
router.get('/fetch-consumers-list', farmController.fetchConsumersList);


module.exports = router;
