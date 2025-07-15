const express = require('express');
const router = express.Router();

// GET all students
router.get('/', (req, res) => {
  const students = req.app.locals.students;
  res.render('students', { students });
});

// POST: Filter students by minimum average grade
router.post('/', (req, res) => {
  const minGrade = parseFloat(req.body.minGrade);
  const students = req.app.locals.students;

  const filtered = students.filter(student => {
    const avg = parseFloat(student.calculateAverageGrade());
    return !isNaN(avg) && avg >= minGrade;
  });

  res.render('students', { students: filtered });
});

// GET single student detail
router.get('/:id', (req, res) => {
  const student = req.app.locals.students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).send('Student not found');

  const average = student.calculateAverageGrade();
  res.render('student-detail', { student, average });
});

module.exports = router;
