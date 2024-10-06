import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Header() {
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b relative">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center hover:text-black">
            <GraduationCap className="h-8 w-8 mr-4" />
            <span className="font-extrabold md:text-xl text-[14px]">
              Student Portal
            </span>
          </Link>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              className="text-[14px] md:text-[16px] font-medium"
            >
              Dashboard
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 items-center">
            <div className="flex cursor-pointer items-center gap-3">
              <span className="font-extrabold md:text-xl text-[14px]">
                My Courses
              </span>
              <TvMinimalPlay className="w-8 h-8" />
            </div>
            <Button>Logout</Button>
          </div>
        </div>
      </header>
      <div className="p-4">
        {/* Additional student-specific content can go here */}
        <h1>Welcome to the Student Portal</h1>
        {/* Add other sections or components for the student view */}
      </div>
    </div>
  );
}

export default Header;