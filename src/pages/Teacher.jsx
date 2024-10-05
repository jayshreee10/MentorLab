import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BarChart, Book, LogOut } from "lucide-react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
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
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null, // We'll handle the modal separately
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
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
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
            <TabsList>
              {menuItems.map((menuItem) => (
                <TabsTrigger value={menuItem.value} key={menuItem.value}>
                  {menuItem.label}
                </TabsTrigger>
              ))}
            </TabsList>
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
