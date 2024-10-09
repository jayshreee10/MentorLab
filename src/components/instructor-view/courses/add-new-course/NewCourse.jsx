import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstructorContext } from "@/context/instructor-context";
import { Text, Youtube } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseLanding from "./CourseDetails";
import CourseCurriculum from "./CourseLectures";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function NewCourse() {
  const [activeTab, setActiveTab] = useState("Lectures");
  const { submitCourse, updateCourse, courseId } =
    useContext(InstructorContext);
  const navigate = useNavigate();

  function handleSubmit() {
    if (courseId !== null) {
      updateCourse();
    } else {
      submitCourse();
    }
    navigate("/instructor");
  }

  const menuItems = [
    {
      icon: Youtube,
      label: "Lectures",
      value: "Lectures",
      component: (
        <div>
          <CourseCurriculum />
        </div>
      ), // Dashboard component
    },
    {
      icon: Text,
      label: "Details",
      value: "Details",
      component: (
        <div>
          <CourseLanding />
        </div>
      ), // Courses component
    },
  ];

  return (
    <main className="h-[100vh] flex-1 p-8 overflow-y-auto bg-gray-100">
      <header className="w-full mx-auto flex items-center gap-10 pb-10">
        <Button
          variant="outline"
          onClick={() => navigate("/instructor")}
          className="gap-2 bg-gray-100 hover:bg-gray-800 hover:text-white"
        >
          <HiOutlineArrowNarrowLeft size={20} /> Go Back
        </Button>
        <div className="text-4xl font-bold">
          {courseId !== null ? "Update Course" : "Create Course"}
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {menuItems.map((menuItem) => (
              <TabsTrigger
                value={menuItem.value}
                key={menuItem.value}
                onClick={() => setActiveTab(menuItem.value)}
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
        <div className="flex justify-end items-center">
          <p className="text-xs px-5">
            Fill both Lectures and Details to submit
          </p>
          <Button onClick={handleSubmit} className="w-[150px]">
            {courseId !== null ? "Update Course" : "Submit Course"}
          </Button>
        </div>
      </div>
      {/* <CourseLanding /> */}
    </main>
  );
}
