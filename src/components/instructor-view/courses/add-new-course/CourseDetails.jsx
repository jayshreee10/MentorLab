import FormControls from "@/components/common-form/form-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseDetailsPageFormControls } from "@/config";
import { useFirebaseContext } from "@/context/firebase-context";
import { InstructorContext } from "@/context/instructor-context";
import { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

function CourseDetails() {
  const { courseDetailsData, setCourseDetailsData } =
    useContext(InstructorContext);
  const [url, setUrl] = useState(courseDetailsData.banner);

  const { uploadFile } = useFirebaseContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function removeImage() {
    setUrl("");
    setFile(null);
  }
  function uploadLocalFile() {
    setLoading(true);
    uploadFile(file)
      .then((url) => {
        setUrl(url);
        setCourseDetailsData({
          ...courseDetailsData,
          banner: url,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="">
          {loading && <p>Uploading...</p>}
          {url == "" ? (
            <div className="mb-5">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <Button onClick={uploadLocalFile}>Upload</Button>
            </div>
          ) : (
            <div className="flex flex-col-reverse items-end">
              <img src={url} />
              <button
                onClick={removeImage}
                className=" text-black"
                title="remove"
              >
                <MdDeleteOutline size={24} />
              </button>
            </div>
          )}
        </div>
        <FormControls
          formControls={courseDetailsPageFormControls}
          formData={courseDetailsData}
          setFormData={setCourseDetailsData}
        />
      </CardContent>
    </Card>
  );
}

export default CourseDetails;