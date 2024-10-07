import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInstructorContext } from "@/context/instructor-context";
import LectureForm from "./LectureForm";

function CourseCurriculum() {
  const {
    courseLectures,
    canAddLecture,
    handleAddLecture,
    currentlyEditedLectureIndex,
  } = useInstructorContext();

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>

      <CardContent>
        {courseLectures.map((lecture, index) => (
          <LectureForm
            key={courseLectures[index].id}
            index={index}
            initialLecturesControls={courseLectures[index]}
            canEdit={currentlyEditedLectureIndex === index}
          />
        ))}
        <Button
          disabled={!canAddLecture()}
          onClick={handleAddLecture}
          className="mb-4"
        >
          Add Lecture
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
