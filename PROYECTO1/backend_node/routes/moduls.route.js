const express = require('express');
const router = express.Router();

const {
    read_moduls
} = require('../controllers/moduls.controller');

router.route('/moduls').post(read_moduls);

module.exports = router;