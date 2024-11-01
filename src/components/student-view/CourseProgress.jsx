import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInstructorContext } from "@/context/instructor-context";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";

function NewStudentCourseProgressPage() {
  const navigate = useNavigate();
  const [currentLecture, setCurrentLecture] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const {
    courseDetailsData,
    courseLectures,
    fetchCourseDataAndInitial,
    courseId,
  } = useInstructorContext();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    console.log("id", id);
    if (courseId == null) {
      fetchCourseDataAndInitial(id);
    }
  }, [courseId]);

  return (
    <div className="h-screen flex flex-col mt-[70px] bg-[#1c1d1f] text-white">
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student/course-details?id=" + courseId)}
            className="text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {courseDetailsData?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-1 ">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <div className="p-6 bg-[#1c1d1f] w-full">
            <h2 className="text-2xl font-bold mb-2">
              {courseLectures[currentLecture]?.title}
            </h2>
            <YoutubeEmbed url={courseLectures[currentLecture]?.youtubeLink} />
            <h2 className="text-2xl pt-4">Description</h2>
            <h4>{courseLectures[currentLecture]?.description}</h4>
            {
              //google form link for quiz courseLectures[currentLecture].googleForm
              <Button
                className="mt-4 bg-white text-black  hover:black hover:text-white"
                onClick={() => {
                  //courseLectures[currentLecture].googleForm
                  window.open(
                    courseLectures[currentLecture].googleForm,
                    "_blank"
                  );
                }}
              >
                Take Quiz
              </Button>
            }
            {
              //google form link for quiz courseLectures[currentLecture].googleForm
              <Button
                className="mt-4 bg-white text-black ml-5 hover:black hover:text-white"
                onClick={() => {
                  //courseLectures[currentLecture].googleForm
                  window.open(
                    courseLectures[currentLecture].fileData.url,
                    "_blank"
                  );
                }}
              >
                Download Material
              </Button>
            }
          </div>
        </div>
        {/* SideBar */}
        <div
          className={`fixed top-[140px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {courseLectures.map((lecture, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentLecture(index)}
                      className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                    >
                      {lecture.isCompleted ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      <span
                        style={{
                          color: currentLecture == index ? "#8e8f90" : "",
                        }}
                      >
                        {lecture.title}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="overview">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {courseDetailsData?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default NewStudentCourseProgressPage;
