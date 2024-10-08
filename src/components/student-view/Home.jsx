import { courseCategories } from "@/config";
import { useInstructorContext } from "@/context/instructor-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ad from "../../../public/Ad.png";
import { useFirebaseContext } from "../../context/firebase-context/index";
import { Button } from "../ui/button";

function StudentHomePage() {
  const navigate = useNavigate();
  const { getAllCourses, deleteCourseData } = useFirebaseContext();
  const { initialCourse } = useInstructorContext();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);
  return (
    <div className="h-screen w-screen bg-white">
      {/* Ad Section */}
      <section className="h-full w-full flex flex-col bg-orange-100 lg:flex-row items-center justify-evenly p-8">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with Us
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img src={Ad} className="size-[800px] rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => {
            return (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
                //          navigate("/student/course-lectures?id=" + courseId);
                onClick={() => {
                  initialCourse(course);
                  navigate("/student/course-details?id=" + course.id);
                }}
              >
                <img
                  src={course.banner}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">Hemant Joshi</p>
                  <p className="font-bold text-[16px]">Free</p>
                </div>
              </div>
            );
          })}

          {/* You can repeat the card structure or map over actual course data */}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
