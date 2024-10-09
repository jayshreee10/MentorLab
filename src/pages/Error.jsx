import React from "react";
import error from "../../public/404.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <img src={error} alt="404" />
      <Button
        className="mr-10"
        onClick={() => {
          navigate("/");
        }}
      >
        {"<-"} Back TO Home Page
      </Button>
    </div>
  );
}

export default Error;
