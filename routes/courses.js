// routes/courses.js

const express = require('express');
const router = express.Router();

// View all ongoing courses across all students
router.get('/', (req, res) => {
  const students = req.app.locals.students;
  let ongoingCourses = [];

  students.forEach(student => {
    const studentCourses = student.courses.filter(c => c.constructor.name === 'OngoingCourse');
    studentCourses.forEach(course => {
      ongoingCourses.push({
        studentName: student.name,
        course
      });
    });
  });

  res.render('courses', { ongoingCourses });
});

module.exports = router;
