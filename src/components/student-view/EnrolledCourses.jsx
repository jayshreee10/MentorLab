import { useApiContext } from "@/context/firebase-context";
import React, { useState, useEffect } from "react";

function EnrolledCourses() {
  const { getAllCourses } = useApiContext();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  return (
    <section className="py-12 px-4 lg:px-8 mt-[70px]">
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
  );
}

export default EnrolledCourses;
