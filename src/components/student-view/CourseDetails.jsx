import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, PlayCircle } from "lucide-react";
import { useInstructorContext } from "@/context/instructor-context";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LocalStorageService } from "@/config/service";

function StudentViewCourseDetailsPage() {
  const {
    courseDetailsData,
    courseLectures,
    courseId,
    fetchCourseDataAndInitial,
  } = useInstructorContext();

  const [searchParams] = useSearchParams();
  const [isEnrolled, setIsEnrolled] = useState(false); // State to track if the course is enrolled

  useEffect(() => {
    if (courseId == null) {
      const id = searchParams.get("id");
      fetchCourseDataAndInitial(id);
    } else {
      // Check if the course is already enrolled
      const enrolled = LocalStorageService.isCourseEnrolled(courseId);
      setIsEnrolled(enrolled);
    }
  }, [courseId]);

  const navigate = useNavigate();

  const handleClickEnrollNow = () => {
    if (!isEnrolled) {
      LocalStorageService.enrollCourse(courseId);
      setIsEnrolled(true); // Update state after enrollment
    }
  };

  return (
    <div className="p-4">
      {/* Course Info Section */}
      <div
        className="absolute top-20 left-5 text-sm font-semibold cursor-pointer"
        onClick={() => navigate("/student/courses")}
      >
        {"<-"}Back
      </div>
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">{courseDetailsData?.title}</h1>
        <p className="text-xl mb-4">{courseDetailsData?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm ">
          <span>Created By {courseDetailsData?.createdBy}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {courseDetailsData?.primaryLanguage}
          </span>
        </div>
      </div>

      {/* Main Content and Sidebar */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow w-[60vw] ">
          {/* What you'll learn Section */}
          <Card className="mb-8 min-h-[600px]">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {courseDetailsData?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </main>

        {/* Sidebar with Video Player and Pricing */}
        <aside className="w-[40vw] ">
          <Card className="h-[600px]">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <img
                  src={courseDetailsData?.banner}
                  alt="course"
                  className="w-[450px] h-[450px] object-contain rounded-lg"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${courseDetailsData?.pricing}
                </span>
              </div>
              <Button
                className="w-full"
                onClick={handleClickEnrollNow}
                disabled={isEnrolled} // Disable button if already enrolled
              >
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <div className="w-full">
        {/* Course Description Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>
          <CardContent>{courseDetailsData?.description}</CardContent>
        </Card>

        {/* Course Curriculum Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            {courseLectures?.map((curriculumItem, index) => (
              <li
                className={`${
                  curriculumItem?.freePreview
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } flex items-center mb-4`}
                key={index}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                <span>{curriculumItem?.title}</span>
              </li>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
