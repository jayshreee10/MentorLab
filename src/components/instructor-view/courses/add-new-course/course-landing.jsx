import FormControls from "@/components/common-form/form-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { useFirebaseContext } from "@/context/firebase-context";
import { InstructorContext } from "@/context/instructor-context";
import { useContext, useState } from "react";

function CourseLanding() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  const [url, setUrl] = useState("");

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
        <div className="py-5">
          {loading && <p>Uploading...</p>}
          {url == "" ? (
            <div className="mt-4">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <Button onClick={uploadLocalFile}>Upload</Button>
            </div>
          ) : (
            <div className="relative">
              <img src={url} />
              <button
                onClick={removeImage}
                className="absolute top-0 text-white"
              >
                remove
              </button>
            </div>
          )}
        </div>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
}

export default CourseLanding;
