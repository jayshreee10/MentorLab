import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common-form";
import { lecturesControls, initialLecturesControls } from "@/config";
function LectureForm({ index }) {
  const [lectureData, setLectureData] = useState(initialLecturesControls);

  function checkIfLectureFormIsValid() {
    return (
      lectureData &&
      lectureData.title !== "" &&
      lectureData.description !== "" &&
      lectureData.youtubeLink !== "" &&
      lectureData.googleForm !== ""
    );
  }

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
            isButtonDisabled={!checkIfLectureFormIsValid()}
            handleSubmit={(event) => {
              event.preventDefault();
            }}
          />

          {/* <Input
            type="file"
            accept="video/*"
            onChange={(event) => handleSingleLectureUpload(event, index)}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default LectureForm;
