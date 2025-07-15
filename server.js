// server.js

const express = require('express');
const path = require('path');
const { Student, OngoingCourse, CompletedCourse } = require('./models/classes');

const app = express();
const PORT = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Sample students and courses
const students = [
  new Student(1, 'Alice Johnson', [
    new CompletedCourse('CPAN123', 'Java Basics', 'Dr. Smith', 85),
    new OngoingCourse('CPAN212', 'Web Tech', 'Ms. Lee', 4),
  ]),
  new Student(2, 'Bob Singh', [
    new CompletedCourse('CPAN111', 'Python Programming', 'Mr. Khan', 92),
    new CompletedCourse('CPAN150', 'Linux Admin', 'Mr. Brown', 78),
  ]),
  new Student(3, 'Charlie Patel', [
    new OngoingCourse('CPAN202', 'ReactJS', 'Ms. Gomez', 2),
    new OngoingCourse('CPAN301', 'Mobile Dev', 'Ms. Grant', 1),
  ])
];

// Make students array available globally in routes
app.locals.students = students;

// Basic home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Student Portal' });
});

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
