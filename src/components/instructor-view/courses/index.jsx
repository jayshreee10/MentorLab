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
import { useNavigate } from "react-router-dom";

const sampleCourses = [
  {
    _id: "1",
    title: "Course 1",
    pricing: 100,
    students: [{ studentName: "John Doe" }, { studentName: "Jane Smith" }],
  },
  {
    _id: "2",
    title: "Course 2",
    pricing: 150,
    students: [{ studentName: "Emily Davis" }],
  },
];

function Index() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button onClick={() => navigate("/create-new-course")} className="p-6">
          Create New Course
        </Button>
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
              {sampleCourses.length > 0 ? (
                sampleCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.students.length}</TableCell>
                    <TableCell>
                      ${course.students.length * course.pricing}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                        variant="ghost"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
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

export default Index;
