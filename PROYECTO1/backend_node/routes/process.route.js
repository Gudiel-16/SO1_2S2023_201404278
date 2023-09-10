const express = require('express');
const router = express.Router();

const {
    kill_process
} = require('../controllers/process.controller');

router.route('/process').post(kill_process);

module.exports = router;