import Header from "@/components/student-view/Header";
import Home from "../components/student-view/Home";
import StudentViewCourseDetailsPage from "@/components/student-view/CourseDetails";

function Student() {
  return (
    <div>
      <Header />
      <Home />
      <StudentViewCourseDetailsPage />
    </div>
  );
}

export default Student;
