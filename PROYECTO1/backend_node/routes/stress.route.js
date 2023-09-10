const express = require('express');
const router = express.Router();

const {
    stress_pc
} = require('../controllers/stress.controller');

router.route('/stress').post(stress_pc);

module.exports = router;