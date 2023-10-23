const express = require('express');
const router = express.Router();

const {
    stored_data,
    notes_course_per_semester,
    courses_with_more_students_per_semester,
    students_with_the_best_average,
    clean_data
} = require('../controllers/data_mysql.controller');

router.route('/datosalmacenados').get(stored_data);
router.route('/notacursoporsemestre').post(notes_course_per_semester);
router.route('/estudiantesporsemestre').post(courses_with_more_students_per_semester);
router.route('/mejorpromedio').post(students_with_the_best_average);
router.route('/cleanmysql').get(clean_data);

module.exports = router;