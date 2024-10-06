import { Route, Routes } from "react-router-dom";
import Instructor from "./pages/Teacher";
import Student from "./pages/Student";
import Hero from "./pages/Hero";
import Home from "./components/student-view/Home";
import SelectCourses from "@/components/student-view/SelectCourses";
import StudentViewCourseDetailsPage from "@/components/student-view/CourseDetails";
import OpenCourse from "./components/student-view/OpenCourse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/student" element={<Student />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<SelectCourses />} />
          <Route path="course-details" element={<OpenCourse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
