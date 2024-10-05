import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";

// Sample data structure for demonstration purposes
const sampleData = [
  {
    title: "Course 1",
    pricing: 100,
    students: [
      { studentName: "John Doe", studentEmail: "john@example.com" },
      { studentName: "Jane Smith", studentEmail: "jane@example.com" },
    ],
  },
  {
    title: "Course 2",
    pricing: 150,
    students: [
      { studentName: "Emily Davis", studentEmail: "emily@example.com" },
    ],
  },
];

function calculateTotalStudentsAndProfit(courses) {
  const { totalStudents, totalProfit, studentList } = courses.reduce(
    (acc, course) => {
      const studentCount = course.students.length;
      acc.totalStudents += studentCount;
      acc.totalProfit += course.pricing * studentCount;

      course.students.forEach((student) => {
        acc.studentList.push({
          courseTitle: course.title,
          studentName: student.studentName,
          studentEmail: student.studentEmail,
        });
      });

      return acc;
    },
    {
      totalStudents: 0,
      totalProfit: 0,
      studentList: [],
    }
  );

  return {
    totalProfit,
    totalStudents,
    studentList,
  };
}

function Index() {
  const { totalProfit, totalStudents, studentList } =
    calculateTotalStudentsAndProfit(sampleData);

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: totalStudents,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: totalProfit,
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList.map((studentItem, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {studentItem.courseTitle}
                    </TableCell>
                    <TableCell>{studentItem.studentName}</TableCell>
                    <TableCell>{studentItem.studentEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;