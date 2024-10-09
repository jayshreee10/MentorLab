import React from "react";
import { Outlet } from "react-router-dom"; // Ensure to import Outlet
import Header from "@/components/student-view/Header";

function Student() {
  return (
    <div>
      <Header />
      {/* The Home component can be included if you want it always visible */}
      <Outlet />
      {/* Render nested routes here */}
    </div>
  );
}

export default Student;
