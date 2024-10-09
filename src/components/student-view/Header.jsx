import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Logout from "../modals/Logout";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <header className="fixed bg-white w-full top-0 flex items-center justify-between p-4 border-b mb-[50px] ">
        <div className="flex items-center space-x-4">
          <Link to="/student" className="flex items-center hover:text-black">
            {/* <GraduationCap className="h-8 w-8 mr-4" /> */}
            <span className="font-extrabold md:text-xl text-[14px]">
              Student Portal
            </span>
          </Link>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              className="text-[14px] md:text-[16px] font-medium"
              onClick={() => navigate("/student/courses")}
            >
              Explore Now
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 items-center">
            {/* <div className="flex cursor-pointer items-center gap-3">
              <Link to="/student/courses" className="flex items-center">
                <span className="font-extrabold md:text-xl text-[14px]">
                  My Courses
                </span>
              </Link>
              <TvMinimalPlay className="w-8 h-8" />
            </div> */}
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Logout
            </Button>
            {openModal && <Logout onCancel={() => setOpenModal(false)} />}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
