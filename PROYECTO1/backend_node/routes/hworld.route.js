const express = require('express');
const router = express.Router();

const {
    hello_world
} = require('../controllers/hworld.controller');

router.route('/').get(hello_world);

module.exports = router;