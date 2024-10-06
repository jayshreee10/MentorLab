import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { lecturesControls } from "@/config";
import LectureForm from "./LectureForm";

function CourseCurriculum() {
  const [courseData, setCourseData] = useState([]);
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);
  const bulkUploadInputRef = React.useRef(null);

  function handleNewLecture() {
    setCourseData([
      ...courseData,
      { title: "", videoUrl: "", freePreview: false, public_id: "" },
    ]);
  }

  function handleTitleChange(event, index) {
    const updatedData = [...courseData];
    updatedData[index].title = event.target.value;
    setCourseData(updatedData);
  }

  function handleFreePreviewChange(value, index) {
    const updatedData = [...courseData];
    updatedData[index].freePreview = value;
    setCourseData(updatedData);
  }

  async function handleSingleLectureUpload(event, index) {
    const file = event.target.files[0];
    if (file) {
      // Simulate media upload process
      setMediaUploadProgress(true);
      // Placeholder for the actual upload function
      setTimeout(() => {
        const videoUrl = URL.createObjectURL(file); // Mock video URL
        const updatedData = [...courseData];
        updatedData[index].videoUrl = videoUrl;
        setCourseData(updatedData);
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(100); // Mock upload percentage
      }, 2000);
    }
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>

      <CardContent>
        <Button onClick={handleNewLecture} className="mb-4">
          Add Lecture
        </Button>

        {/* {mediaUploadProgress && (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        )} */}

        {courseData.map((lecture, index) => (
          <LectureForm index={index} />
        ))}
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
