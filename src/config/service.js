export class LocalStorageService {
  // Set token, email, and role to local storage
  static setToken(token, email, role, username) {
    localStorage.setItem("token_key", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  }

  // Get token from local storage
  static getToken() {
    return localStorage.getItem("token_key");
  }

  // Remove token, email, and role from local storage
  static removeToken() {
    localStorage.removeItem("token_key");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  }

  // Check if a course is enrolled
  static isCourseEnrolled(courseId) {
    const enrolledCourses = this.getEnrolledCourses();
    return enrolledCourses.includes(courseId);
  }

  // Get all enrolled courses as an array from local storage
  static getEnrolledCourses() {
    const enrolledCourses = localStorage.getItem("enrolled_courses");
    return enrolledCourses ? JSON.parse(enrolledCourses) : [];
  }

  // Enroll a new course by adding its ID to the enrolled courses array
  static enrollCourse(courseId) {
    try {
      const enrolledCourses = this.getEnrolledCourses(); // Get the array of enrolled courses
      if (!enrolledCourses.includes(courseId)) {
        enrolledCourses.push(courseId); // Add the new course ID
        localStorage.setItem(
          "enrolled_courses",
          JSON.stringify(enrolledCourses)
        ); // Store as a string
        alert("Course Enrolled Successfully ✅");
      } else {
        alert("You are already enrolled in this course");
      }
    } catch (error) {
      alert("Course Enrollment failed ❌");
    }
  }

  // Remove a course from enrolled courses by ID
  static removeEnrollment(courseId) {
    const enrolledCourses = this.getEnrolledCourses();
    if (enrolledCourses) {
      const updatedCourses = enrolledCourses.filter((id) => id !== courseId); // Remove the course
      localStorage.setItem("enrolled_courses", JSON.stringify(updatedCourses)); // Store as a string
    }
  }
}
