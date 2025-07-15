// routes/students.js

const express = require('express');
const router = express.Router();

// View all students
router.get('/', (req, res) => {
  const students = req.app.locals.students;
  res.render('students', { students });
});

// View single student by ID (with average)
router.get('/:id', (req, res) => {
  const student = req.app.locals.students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).send('Student not found');

  const average = student.calculateAverageGrade();
  res.render('student-detail', { student, average });
});

module.exports = router;
