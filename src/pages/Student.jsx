import Header from "@/components/student-view/Header";
import Home from "../components/student-view/Home";
import StudentViewCourseDetailsPage from "@/components/student-view/CourseDetails";
import NewStudentCourseProgressPage from "@/components/student-view/CourseProgress";
import SelectCourses from "@/components/student-view/SelectCourses";
// import StudentCourses from "@/components/student-view/StudentCourses";

function Student() {
  return (
    <div>
      <Header />
      <Home />
      {/* <StudentViewCourseDetailsPage /> */}
      {/* <NewStudentCourseProgressPage /> */}
      <SelectCourses />
      {/* <StudentCourses /> */}
    </div>
  );
}

export default Student;
