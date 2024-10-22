import { LocalStorageService } from "@/config/service";
import { useApiContext } from "@/context/firebase-context";
import React, { useState, useEffect, useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useInstructorContext } from "@/context/instructor-context";
import { Button } from "../ui/button";

function EnrolledCourses() {
  const { initialCourse } = useInstructorContext();
  const { getAllCourses } = useApiContext();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch all courses and filter the enrolled ones
  useEffect(() => {
    getAllCourses().then((courses) => {
      const enrolled = LocalStorageService.getEnrolledCourses();
      const filteredCourses = courses.filter((course) =>
        enrolled.includes(course.courseId)
      );
      setCourses(filteredCourses);
      setEnrolledCourses(enrolled); // Store enrolled courses array
    });
  }, []);

  // Handle course deletion
  const handleDelete = useCallback(
    (courseId) => {
      LocalStorageService.removeEnrollment(courseId);
      const updatedCourses = courses.filter(
        (course) => course.courseId !== courseId
      );
      setCourses(updatedCourses);
    },
    [courses]
  );

  return (
    <section className="py-12 px-4 lg:px-8 mt-[70px]">
      <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="border rounded-lg overflow-hidden shadow cursor-pointer"
            >
              <img
                src={course.banner}
                width={300}
                height={150}
                className="w-full h-40 object-cover"
                alt={course.title}
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-700 mb-2 flex justify-between">
                  <Button
                    onClick={() => {
                      initialCourse(course);
                      navigate("/student/course-details?id=" + course.courseId);
                    }}
                  >
                    Start Learning
                  </Button>
                  <Button onClick={() => handleDelete(course.courseId)}>
                    <MdDeleteOutline size={24} />
                  </Button>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center text-lg">
          Oops!! No course found
        </div>
      )}
    </section>
  );
}

export default EnrolledCourses;
