import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEditTestimonial } from "../../../hooks/hospitalWeb/useEditTestimonial";
import ChooseFile from "../../Hospitals/ChooseFile";

function EditTestimonial(props) {
  const { handleClose, testimonialDetails } = props;
  const [status, setStatus] = useState(true);
  const { mutate, isLoading } = useEditTestimonial();
  const [fileURL, setFileURL] = useState("");
  const methods = useForm();

  useEffect(() => {
    if (testimonialDetails) {
      methods.setValue("patient_name", testimonialDetails.patient_name);
      methods.setValue("designation", testimonialDetails.designation);
      methods.setValue("rating", testimonialDetails.rating);
      methods.setValue("message", testimonialDetails.message);
      methods.setValue("order", testimonialDetails.order);
      setFileURL(testimonialDetails.patient_image || "");
      setStatus(testimonialDetails.is_active);
    }
  }, [testimonialDetails, methods]);

  const onUpdateTestimonial = async (data) => {
    const testimonial = {
      patient_name: data.patient_name || "",
      patient_image: fileURL,
      rating: Number(data.rating) || 5,
      message: data.message || "",
      designation: data.designation || "",
      order: Number(data.order) || 0,
      is_active: status,
    };
    await mutate(
      { id: testimonialDetails.id, data: testimonial },
      {
        onSuccess: () => {
          methods.reset();
          handleClose();
        },
      }
    );
  };

  const handleFileURL = (url) => {
    setFileURL(url);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded ps-1 pe-1"
        onSubmit={methods.handleSubmit(onUpdateTestimonial)}
      >
        <div className="row">
          <div className="col-md-8">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <select
              className="hospital-draft-btn text-primary status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
            >
              <option value={true}>Active</option>
              <option value={false}>In Active</option>
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <div className="form-group">
              <InputField
                name="patient_name"
                label="Patient Name"
                validation={{ required: "Patient name is required" }}
                placeholder="Enter patient name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="designation"
                label="Designation"
                placeholder="Enter designation"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="rating"
                label="Rating (1-5)"
                placeholder="5"
                type="number"
                min="1"
                max="5"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <InputField
                name="message"
                label="Message"
                placeholder="Enter message"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <InputField
                name="order"
                label="Order"
                placeholder="0"
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end ps-3 pe-3 pb-5 pt-3">
          <Button variant="primary" className="ps-5 pe-5" type="submit" disabled={isLoading}>
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}
            <span className="ps-2">Submit</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

EditTestimonial.propTypes = {
  handleClose: PropTypes.func.isRequired,
  testimonialDetails: PropTypes.object,
};

export default EditTestimonial;
