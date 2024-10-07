import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import LectureForm from "./LectureForm";

function CourseCurriculum() {
  const [courseData, setCourseData] = useState([]);

  function handleNewLecture() {
    setCourseData([
      ...courseData,
      { title: "", videoUrl: "", freePreview: false, public_id: "" },
    ]);
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

        {courseData.map((lecture, index) => (
          <LectureForm key={index} index={index} />
        ))}
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
