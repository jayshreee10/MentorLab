import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StudentContext } from "@/context/student-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCourses() {
  const { availableCoursesList, setAvailableCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available courses here and set the state
    // Example: setAvailableCoursesList(fetchedCourses);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Select Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {availableCoursesList && availableCoursesList.length > 0 ? (
          availableCoursesList.map((course) => (
            <Card key={course.courseId} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course/details/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  Select Course
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses Available</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCourses;
