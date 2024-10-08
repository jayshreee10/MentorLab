import NewCourse from "@/components/instructor-view/courses/add-new-course/NewCourse";
import SelectCourses from "@/components/student-view/SelectCourses";
import { Route, Routes } from "react-router-dom";
import NewStudentCourseProgressPage from "./components/student-view/CourseProgress";
import Home from "./components/student-view/Home";
import OpenCourse from "./components/student-view/OpenCourse";
import Hero from "./pages/Hero";
import Student from "./pages/Student";
import Instructor from "./pages/Teacher";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/instructor/create-course" element={<NewCourse />} />
        <Route path="/instructor/edit-course" element={<NewCourse />} />
        <Route path="/student" element={<Student />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<SelectCourses />} />
          <Route path="course-details" element={<OpenCourse />} />
          <Route
            path="course-lectures"
            element={<NewStudentCourseProgressPage />}
          />
        </Route>
        <Route path="/Test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
