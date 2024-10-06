import { createContext, useContext, useState } from "react";

const CourseContext = createContext(null);

export const useCourseContext = () => {
  return useContext(CourseContext);
};

function CourseContextProvider({ children }) {
  // State to manage lectures and the list of all lecture details
  const [lectures, setLectures] = useState({
    title: "",
    desc: "",
    youTubeLink: "",
    googleFormLink: "",
    files: { name: "", type: "", link: "" },
  });

  const [allLectureDetails, setAllLectureDetails] = useState([]);

  // Define the CreateCourse object
  const CreateCourse = {
    userId: "",
    lectures: allLectureDetails,
    courseDetails: {
      title: "",
      category: "",
      level: "",
      primaryLanguage: "",
      subtitle: "",
      description: "",
      pricing: "",
      objective: "",
      welcomeMessage: "",
      thumbnailUrl: "",
    },
  };

  // Handle form submission to add a new lecture
  const handleAddTask = (e) => {
    e.preventDefault();

    // Validate input
    if (!lectures.title || !lectures.desc) {
      alert("Please fill in both Title and Description ");
      return;
    }

    // Add the new lecture to allLectureDetails
    setAllLectureDetails((prev) => [...prev, lectures]);

    // Reset the lecture input fields after adding the task
    setLectures({
      title: "",
      desc: "",
      youTubeLink: "",
      googleFormLink: "",
      files: { name: "", type: "", link: "" },
    });
  };

  const value = { CreateCourse, lectures, handleAddTask, setLectures };
  // Provide context value to children
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export default CourseContextProvider;