import NewCourse from "@/components/instructor-view/courses/add-new-course/NewCourse";
import SelectCourses from "@/components/student-view/SelectCourses";
import { Route, Routes } from "react-router-dom";
import NewStudentCourseProgressPage from "./components/student-view/CourseProgress";
import Home from "./components/student-view/Home";
import OpenCourse from "./components/student-view/OpenCourse";
import Hero from "./pages/Hero";
import Student from "./pages/Student";
import Instructor from "./pages/Teacher";
import Error from "./pages/Error";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <Instructor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/create-course"
          element={
            <ProtectedRoute>
              <NewCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/edit-course"
          element={
            <ProtectedRoute>
              <NewCourse />
            </ProtectedRoute>
          }
        />

        {/* Protected routes for student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="courses" element={<SelectCourses />} />
          <Route path="course-details" element={<OpenCourse />} />
          <Route
            path="course-lectures"
            element={<NewStudentCourseProgressPage />}
          />
        </Route>

        {/* Error page */}
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token_key");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
