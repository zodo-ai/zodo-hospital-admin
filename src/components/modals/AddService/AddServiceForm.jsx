import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useCreateService } from "../../../hooks/hospital-services/useCreateService";
import PropTypes from "prop-types";
import InputField from "../../Inputfields/InputField";
import TextArea from "../../Inputfields/TextArea";
import ChooseFile from "../../Hospitals/ChooseFile";
function AddServiceForm(props) {
  const { handleClose } = props;
  const methods = useForm();
  const [fileURL, setFileURL] = useState("");
  const { hospitalId } = useAuth();

  const { mutate, isLoading } = useCreateService();
  const onCreateService = async (data) => {
    const service = {
      name: data.serviceName,
      description: data.message,
      hospital_id: hospitalId,
      price: data.price,
      image: fileURL,
      strike_through_price: data.strikePrice,
      daily_booking_count: parseInt(data.appointmentLimit),
    };
    await mutate(service, {
      onSuccess: () => {
        methods.reset();
        handleClose();
      },
    });
  };
  const handleFileURL = (url) => {
    setFileURL(url);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onCreateService)}>
        <div className="row mt-4">
          <div className="col-md-12 ms-md-2">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
        </div>
        <div className="form-group mt-2">
          <div className="col-md-12">
            <InputField
              name="serviceName"
              label="Service Name"
              validation={{ required: "Service Name is required" }}
              placeholder="Enter Service Name"
              type="text"
            />
          </div>
        </div>

        <div className="form-group mt-2 row">
          <div className="col-md-4">
            <InputField
              name="price"
              label="Price"
              validation={{ required: "Price is required" }}
              placeholder="Enter Price"
              type="price"
              pattern="[0-9]*[.,]?[0-9]*"
            />
          </div>
          <div className="col-md-4">
            <InputField
              name="strikePrice"
              label="Strike Price"
              validation={{ required: "Strike Price is required" }}
              placeholder="Enter Strike Price"
              type="price"
              pattern="[0-9]*[.,]?[0-9]*"
            />
          </div>

          <div className="col-md-4">
            <InputField
              name="appointmentLimit"
              label="Appointment Limit Per Day"
              validation={{ required: "Appointment limit per day is required" }}
              placeholder="Enter appointment limit / day"
              type="number"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <TextArea
              name="message"
              label="Description"
              placeholder="Type message here"
            />
          </div>
        </div>

        <div className="form-group d-flex justify-content-end pt-3">
          <button
            to="#"
            //   data-bs-toggle="modal"
            //   data-bs-target="#delete_invoices_details"
            className="hospital-draft-btn text-primary pt-1 pb-1 ps-3 pe-3 rounded"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
          <button
            to="#"
            //   data-bs-toggle="modal"
            //   data-bs-target="#save_invocies_details"
            className="hospital-add-btn ms-1 text-white border-0 pt-1 pb-1 ps-3 pe-3 rounded"
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}
            <span className="ps-2">Save</span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

// validate props
AddServiceForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddServiceForm;
