import { courseCategories } from "@/config";
import { useInstructorContext } from "@/context/instructor-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/five.jpg";
import { useApiContext } from "../../context/firebase-context/index";
import { Button } from "../ui/button";

function StudentHomePage() {
  const navigate = useNavigate();
  const { getAllCourses } = useApiContext();
  const { initialCourse } = useInstructorContext();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);
  return (
    <div className="h-screen w-screen bg-white ">
      {/* Ad Section */}
      <section className="mt-[70px] h-full w-full flex flex-col bg-white items-center justify-center gap-10 p-8 relative overflow-hidden">
        {/* Background Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="Mentor Lab Banner"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="z-10 flex flex-col justify-center items-center gap-6 text-center w-full">
          {/* <img
            src={logo}
            alt="logo"
            className="w-[200px] h-auto animate-fade-in"
          /> */}
          <h1 className="text-6xl font-bold text-black animate-fade-in backdrop-blur-sm">
            Welcome to Mentor Lab
          </h1>
          <h3 className="text-lg bg-black bg-opacity-60 px-10 py-5 rounded-[100px] font-semibold tracking-wider text-white animate-fade-in">
            Learn, Grow, and Achieve with Expert-Led Courses.
          </h3>
          <div className="w-[200px]">
            <Button
              onClick={() => navigate("/student/courses")}
              className="bg-black text-white  transition duration-300 ease-in-out"
            >
              Start Learning {"->"}
            </Button>
          </div>
        </div>

        {/* Unique Features Section */}
        <div className="flex flex-col items-center gap-8 mt-10 z-10">
          <h2 className="text-4xl font-bold text-black backdrop-blur-sm text-center">
            Why Choose Mentor Lab?
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {/* Feature 1 */}
            <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-md w-64 h-64 transform transition-transform duration-300 hover:scale-105 animate-fade-in flex flex-col items-center justify-center">
              <h4 className="text-xl font-bold text-white">
                Expert Mentorship
              </h4>
              <p className="text-gray-300 text-center">
                Connect with industry leaders and gain insights into real-world
                scenarios.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-md w-64 h-64 transform transition-transform duration-300 hover:scale-105 animate-fade-in flex flex-col items-center justify-center">
              <h4 className="text-xl font-bold text-white">
                Interactive Learning
              </h4>
              <p className="text-gray-300 text-center">
                Engage in hands-on projects and discussions to enhance your
                skills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-md w-64 h-64 transform transition-transform duration-300 hover:scale-105 animate-fade-in flex flex-col items-center justify-center">
              <h4 className="text-xl font-bold text-white">
                Flexible Schedule
              </h4>
              <p className="text-gray-300 text-center">
                Learn at your own pace, with courses available 24/7.
              </p>
            </div>
          </div>
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
                  navigate("/student/course-details?id=" + course.courseId);
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
                  <p className="text-sm text-gray-700 mb-2">Jayshree</p>
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

{
  /* <Button
className="justify-start"
variant="outline"
key={categoryItem.id}
>
{categoryItem.label}
</Button> */
}
