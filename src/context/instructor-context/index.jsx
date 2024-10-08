import {
  courseLandingInitialFormData,
  initialLecturesControls,
} from "@/config";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFirebaseContext } from "../firebase-context";

export const InstructorContext = createContext(null);

export const useInstructorContext = () => {
  return useContext(InstructorContext);
};

export default function InstructorProvider({ children }) {
  const [courseDetailsData, setCourseDetailsData] = useState(
    courseLandingInitialFormData
  );
  const [courseLectures, setCourseLectures] = useState([]);

  const [currentlyEditedLectureIndex, setCurrentlyEditedLectureIndex] =
    useState(0);

  const [courseId, setCourseId] = useState(null);

  const { createCourseData, updateCourseData, getCourseData } =
    useFirebaseContext();

  function fetchCourseDataAndInitial(courseId) {
    //fetch course data and initial
    getCourseData(courseId).then((course) => {
      initialCourse(course);
    });
  }

  function initialCourse(course) {
    setCourseId(course.id);
    setCourseDetailsData({
      title: course.title,
      category: course.category,
      level: course.level,
      primaryLanguage: course.primaryLanguage,
      subtitle: course.subtitle,
      description: course.description,
      pricing: course.pricing,
      objectives: course.objectives,
      welcomeMessage: course.welcomeMessage,
      banner: course.banner,
    });

    setCourseLectures(course.curriculum);
    setCurrentlyEditedLectureIndex(null);
  }
  function initialNewCourse() {
    setCourseDetailsData(courseLandingInitialFormData);
    setCourseLectures([]);
    setCurrentlyEditedLectureIndex(null);
    setCourseId(null);
  }

  //add new lecture
  function handleAddLecture() {
    setCourseLectures([
      ...courseLectures,
      {
        ...initialLecturesControls,
        id: uuidv4(),
      },
    ]);

    setCurrentlyEditedLectureIndex(courseLectures.length);
  }
  //delete lecture
  function handleDeleteLecture(index) {
    const newLectures = [];

    courseLectures.forEach((lecture, i) => {
      if (i !== index) {
        newLectures.push(lecture);
      }
    });

    setCourseLectures(newLectures);
  }

  //update lecture
  function handleUpdateLecture(index, updatedLecture) {
    const newLectures = [];

    courseLectures.forEach((lecture, i) => {
      if (i === index) {
        newLectures.push(updatedLecture);
      } else {
        newLectures.push(lecture);
      }
    });

    setCourseLectures(newLectures);
    setCurrentlyEditedLectureIndex(null);
  }

  //can add lecture, when latest lecture is valid
  function canAddLecture() {
    if (courseLectures.length === 0) {
      return true;
    }

    if (currentlyEditedLectureIndex !== null) {
      return false;
    }
    const latestLecture = courseLectures[courseLectures.length - 1];
    return (
      latestLecture.title !== "" &&
      latestLecture.description !== "" &&
      latestLecture.youtubeLink !== "" &&
      latestLecture.googleFormLink !== "" &&
      latestLecture.fileData.url !== "" &&
      latestLecture.fileData.type !== ""
    );
  }

  function submitCourse() {
    try {
      const courseData = {
        ...courseDetailsData,
        curriculum: courseLectures,
        id: uuidv4(),
      };
      console.log(courseData);
      createCourseData(courseData);
    } catch (error) {
      console.log(error);
      alert("Failed to create course");
    }
  }

  function updateCourse() {
    try {
      const courseData = {
        ...courseDetailsData,
        curriculum: courseLectures,
        id: courseId,
      };
      console.log(courseData);
      updateCourseData(courseData);
    } catch (error) {
      console.log(error);
      alert("Failed to update course");
    }
  }

  return (
    <InstructorContext.Provider
      value={{
        courseDetailsData,
        setCourseDetailsData,
        submitCourse,
        courseLectures,
        setCourseLectures,
        handleAddLecture,
        handleDeleteLecture,
        handleUpdateLecture,
        canAddLecture,
        currentlyEditedLectureIndex,
        setCurrentlyEditedLectureIndex,
        initialCourse,
        updateCourse,
        setCourseId,
        courseId,
        initialNewCourse,
        fetchCourseDataAndInitial,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
