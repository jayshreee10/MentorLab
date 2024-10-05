import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BarChart, Book, LogOut, MonitorUp } from "lucide-react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineAddToQueue } from "react-icons/md";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import NewCourse from "@/components/instructor-view/courses/add-new-course/NewCourse";
import Logout from "@/components/modals/Logout";

export default function Teacher() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for the logout modal

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },

    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: MonitorUp,
      label: "Create Course",
      value: "Create Course",
      component: <NewCourse />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null, // No content component for logout
    },
  ];

  function handleLogout() {
    // Display the logout confirmation modal
    setShowLogoutModal(true);
  }

  function confirmLogout() {
    // Handle logout logic here
    console.log("Logged out");
    setShowLogoutModal(false); // Close the modal after logging out
    setActiveTab("dashboard"); // Optionally navigate back to the dashboard or another tab after logging out
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
            <LiaChalkboardTeacherSolid size={30} />
            Instructor
          </h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout // Trigger logout modal
                    : () => setActiveTab(menuItem.value) // Change tab
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {menuItems.find((item) => item.value === activeTab)?.label}
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      {showLogoutModal && (
        <Logout
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
