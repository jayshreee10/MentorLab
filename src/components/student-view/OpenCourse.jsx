import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Ensure these imports are correct
import { useInstructorContext } from "@/context/instructor-context";
import { Text, Youtube } from "lucide-react"; // You may change the icons as per your needs
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentViewCourseDetailsPage from "./CourseDetails"; // Adjust the import path as necessary

export default function OpenCourse() {
  const [activeTab, setActiveTab] = useState("CourseDetails");
  const { courseDetailsData, courseLectures, courseId } =
    useInstructorContext();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Youtube, // You can change the icon as needed
      label: "Course Details",
      value: "CourseDetails",
      component: <StudentViewCourseDetailsPage />, // Render the course details component
    },
    {
      icon: Text, // You can change the icon as needed
      label: "Course Progress",
      value: "CourseProgress",
      component: null, // Render the course progress component
    },
  ];

  return (
    <main className="flex-1 mt-[60px] p-8 overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {menuItems.map((menuItem) => (
              <TabsTrigger
                value={menuItem.value}
                key={menuItem.value}
                onClick={() => {
                  if (menuItem.value === "CourseProgress") {
                    navigate("/student/course-lectures?id=" + courseId);
                  } else {
                    setActiveTab(menuItem.value);
                  }
                }}
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Rendering Tab Contents */}
          {menuItems.map((menuItem) => (
            <TabsContent value={menuItem.value} key={menuItem.value}>
              {menuItem.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
