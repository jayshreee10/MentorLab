import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiContext } from "@/context/firebase-context";
import { useInstructorContext } from "@/context/instructor-context";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getRandomNumber } from "../../../config/index";

function Courses() {
  const navigate = useNavigate();
  const { getAllCourses, deleteCourseData } = useApiContext();
  const { initialCourse } = useInstructorContext();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  function editCourse(index) {
    initialCourse(courses[index]);
    navigate("/instructor/edit-course");
  }

  function deleteCourse(index) {
    const course = courses[index];
    deleteCourseData(course.courseId);
    const newCourses = [];

    courses.forEach((c, i) => {
      if (i !== index) {
        newCourses.push(c);
      }
    });

    setCourses(newCourses);
  }

  function enableEdit(course) {
    const editorEmail = localStorage.getItem("email");
    return editorEmail === course.createdBy;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold ">All Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <TableRow key={course.courseId}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{getRandomNumber()}</TableCell>
                    <TableCell>Free</TableCell>
                    <TableCell className="text-right">
                      {enableEdit(course) && (
                        <>
                          <Button
                            onClick={() => editCourse(index)}
                            variant="ghost"
                            size="sm"
                          >
                            <AiFillEdit size={20} />
                          </Button>
                          <Button
                            onClick={() => deleteCourse(index)}
                            variant="ghost"
                            size="sm"
                          >
                            <MdDelete size={20} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No courses available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default Courses;
