// Base Course class representing any general course
class Course {
  constructor(code, name, instructor) {
    this.code = code;             // Course code (e.g., CPAN212)
    this.name = name;             // Course title (e.g., Web Technologies)
    this.instructor = instructor; // Instructor name
  }
}

// Represents a course that is still ongoing
class OngoingCourse extends Course {
  constructor(code, name, instructor, currentWeek) {
    super(code, name, instructor);
    this.currentWeek = currentWeek; // What week the course is currently in
  }
}

// Represents a course that the student has completed
class CompletedCourse extends Course {
  constructor(code, name, instructor, finalGrade) {
    super(code, name, instructor);
    this.finalGrade = finalGrade; // Final grade earned in this course
  }
}

// Student class holds student details and their courses
class Student {
  constructor(id, name, courses = []) {
    this.id = id;             // Unique student ID
    this.name = name;         // Student's full name
    this.courses = courses;   // List of both completed and ongoing courses
  }

  // Calculate average grade from only completed courses
  calculateAverageGrade() {
    const completed = this.courses.filter(c => c instanceof CompletedCourse);
    if (completed.length === 0) return 'N/A'; // No grades to average

    const total = completed.reduce((sum, c) => sum + c.finalGrade, 0);
    return (total / completed.length).toFixed(2); // Return average to 2 decimal places
  }
}

// Export all classes so they can be used in other files (like routes)
module.exports = { Course, OngoingCourse, CompletedCourse, Student };
