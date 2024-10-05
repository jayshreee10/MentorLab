import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
// import MediaProgressbar from "@/components/media-progress-bar";
// import VideoPlayer from "@/components/video-player";

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
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold">Lecture {index + 1}</h3>
              <Input
                placeholder="Enter lecture title"
                value={lecture.title}
                onChange={(event) => handleTitleChange(event, index)}
                className="max-w-xs"
              />
              {/* <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(value) =>
                    handleFreePreviewChange(value, index)
                  }
                  checked={lecture.freePreview}
                />
                <Label>Free Preview</Label>
              </div> */}
            </div>

            <div className="mt-4">
              {lecture.videoUrl ? (
                <div className="flex gap-4">
                  {/* <VideoPlayer
                    url={lecture.videoUrl}
                    width="450px"
                    height="200px"
                  /> */}
                  <Button
                    variant="secondary"
                    onClick={() => handleSingleLectureUpload(null, index)}
                  >
                    Replace Video
                  </Button>
                </div>
              ) : (
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
