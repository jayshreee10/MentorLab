import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Youtube } from "lucide-react";
import { useState } from "react";
import CourseCurriculum from "./course-curriculum";
import CourseLanding from "./course-landing";

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("Lectures");

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
    <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto ">
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
          <Button>Submit</Button>

          {/* Rendering Tab Contents */}
          {menuItems.map((menuItem) => (
            <TabsContent value={menuItem.value} key={menuItem.value}>
              {menuItem.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* <CourseLanding /> */}
    </main>
  );
}
