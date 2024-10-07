import CommonForm from "@/components/common-form";
import { Button } from "@/components/ui/button";
import { initialLecturesControls, lecturesControls } from "@/config";
import { useFirebaseContext } from "@/context/firebase-context";
import { useEffect, useState } from "react";

function LectureForm({ index }) {
  const [lectureData, setLectureData] = useState(initialLecturesControls);
  const [errors, setErrors] = useState({
    youtubeLink: "",
    googleForm: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { uploadFile } = useFirebaseContext();
  const [file, setFile] = useState(null);
  // const [url, setUrl] = useState("");
  const [fileData, setFileData] = useState({
    url: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  function removeFile() {
    setFileData({ url: "", type: "" });
    setFile(null);
  }
  function uploadLocalFile() {
    const tempArray = file.name.split(".");
    const fileType = tempArray[tempArray.length - 1];

    setLoading(true);
    uploadFile(file)
      .then((url) => {
        setFileData({ url, type: fileType });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  // General regular expression for URL validation
  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

  // Validate YouTube and Google Form Links when form data changes
  useEffect(() => {
    const validateLinks = () => {
      let youtubeLinkError = "";
      let googleFormError = "";
      let valid = true;

      // YouTube Link validation (general URL check)
      if (!lectureData.youtubeLink || !urlRegex.test(lectureData.youtubeLink)) {
        youtubeLinkError = "Please enter a valid YouTube link";
        valid = false;
      }

      // Google Form Link validation (general URL check)
      if (!lectureData.googleForm || !urlRegex.test(lectureData.googleForm)) {
        googleFormError = "Please enter a valid Google Form link";
        valid = false;
      }

      setErrors({
        youtubeLink: youtubeLinkError,
        googleForm: googleFormError,
      });

      return valid;
    };

    // Check if all required fields (title, description, links) are valid
    const formIsValid =
      lectureData.title !== "" &&
      lectureData.description !== "" &&
      validateLinks(); // Validate links when lectureData changes

    setIsFormValid(formIsValid); // Update form validity
  }, [lectureData]); // Only run validation when lectureData changes

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid) {
      // Submit the form if all validations pass
      console.log("Form Submitted", lectureData);
    }
  };

  return (
    <div className="w-full">
      <div key={index} className="border p-4 mb-4 rounded-md">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold">Lecture {index + 1}</h3>
          <Button>Delete</Button>
        </div>

        <div className="mt-4">
          <CommonForm
            formControls={lecturesControls}
            buttonText={"Confirm & Submit Lecture"}
            formData={lectureData}
            setFormData={setLectureData}
            isButtonDisabled={!isFormValid} // Button enabled only if the form is valid
            handleSubmit={handleSubmit} // Handle form submission
          >
            {loading && <p>Uploading...</p>}
            {fileData.url == "" ? (
              <div className="mt-4">
                <input
                  type="file"
                  //only allow image , pdf, ppt, doc
                  accept="image/*,.pdf,.ppt,.pptx,.doc,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <Button onClick={uploadLocalFile}>Upload</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                {fileData.type === "pdf" ? (
                  <div>pdf</div>
                ) : fileData.type === "ppt" || fileData.type === "pptx" ? (
                  <div>ppt</div>
                ) : fileData.type === "doc" || fileData.type === "docx" ? (
                  <div>doc</div>
                ) : (
                  <div> image</div>
                )}
                <button onClick={removeFile} className="">
                  remove
                </button>
              </div>
            )}
          </CommonForm>

          {/* Display errors conditionally */}
          {errors.youtubeLink && (
            <p className="text-red-500 mt-2">{errors.youtubeLink}</p>
          )}
          {errors.googleForm && (
            <p className="text-red-500 mt-2">{errors.googleForm}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LectureForm;
