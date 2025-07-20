import { useEffect, useState } from "react";
import ChooseFile from "../../Hospitals/ChooseFile";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import TextArea from "../../Inputfields/TextArea";
import PropTypes from "prop-types";
import { useViewService } from "../../../hooks/hospital-services/useViewService";
import { useUpdateService } from "../../../hooks/hospital-services/useUpdateService";
import { useAuth } from "../../../hooks/useAuth";

function EditServiceForm(props) {
  const { hospitalId } = useAuth();
  const { handleClose, selectedService } = props;
  const methods = useForm();
  const { data: service } = useViewService(selectedService);
  const { mutate, isLoading } = useUpdateService();
  const [fileURL, setFileURL] = useState("");

  const onUpdateService = async (data) => {
    const serviceData = {
      name: data.serviceName,
      description: data.message,
      hospital_id: hospitalId,
      price: data.price,
      strike_through_price: data.strikePrice,
      image: fileURL,
      daily_booking_count: parseInt(data.appointmentLimit),

    };

    await mutate(
      { id: service?.id, data: serviceData },
      {
        onSuccess: () => {
          handleClose(); // Close the modal after successful submission
          methods.reset();
        },
      }
    );
    // await mutate(service);
    // methods.reset();
    // handleClose(); // Close the modal after successful submission
  };

  useEffect(() => {
    if (service) {
      setFileURL(service.image);
      methods.reset({
        serviceName: service.name,
        price: service.price,
        strikePrice: service.strike_through_price,
        message: service.description,
        appointmentLimit: service?.daily_booking_count
      });
    }
  }, [service, methods]);
  const handleFileURL = (url) => {
    setFileURL(url);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onUpdateService)}>
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
              label="Message"
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
EditServiceForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  selectedService: PropTypes.string.isRequired,
};

export default EditServiceForm;
