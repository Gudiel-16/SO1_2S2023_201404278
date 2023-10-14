const express = require('express');
const router = express.Router();

const {
    stored_data,
    notes_course_per_semester,
    courses_with_more_students_per_semester,
    students_with_the_best_average
} = require('../controllers/data_mysql.controller');

router.route('/datosalmacenados').get(stored_data);
router.route('/notacursoporsemestre').post(notes_course_per_semester);
router.route('/estudiantesporsemestre').post(courses_with_more_students_per_semester);
router.route('/mejorpromedio').get(students_with_the_best_average);

module.exports = router;