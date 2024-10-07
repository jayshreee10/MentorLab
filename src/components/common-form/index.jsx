import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  canEdit = true,
  children,
  removeButton = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
        canEdit={canEdit}
      />
      {children}
      {!removeButton && (
        <Button
          disabled={isButtonDisabled}
          type="submit"
          className="mt-5 w-full"
        >
          {buttonText || "Submit"}
        </Button>
      )}
    </form>
  );
}

export default CommonForm;
