import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import { useAddGallery } from "../../../hooks/hospitalWeb/useAddGallery";
import ChooseFile from "../../Hospitals/ChooseFile";

function AddGallery(props) {
  const { handleClose } = props;
  const [status, setStatus] = useState(true);
  const { hospitalId } = useAuth();
  const { mutate, isLoading } = useAddGallery();
  const [fileURL, setFileURL] = useState("");
  const methods = useForm();

  const onCreateGallery = async (data) => {
    const gallery = {
      hospital_id: hospitalId,
      image: fileURL,
      caption: data.caption || "",
      order: Number(data.order) || 0,
      is_active: status,
    };
    await mutate(gallery, {
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
      <form
        className="bg-white rounded ps-1 pe-1"
        onSubmit={methods.handleSubmit(onCreateGallery)}
      >
        <div className="row">
          <div className="col-md-8">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <select
              className="hospital-draft-btn text-primary status-select"
              onChange={(e) => setStatus(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">In Active</option>
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <div className="form-group">
              <InputField
                name="caption"
                label="Caption"
                placeholder="Enter caption"
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

AddGallery.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddGallery;
