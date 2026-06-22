import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEditGallery } from "../../../hooks/hospitalWeb/useEditGallery";
import ChooseFile from "../../Hospitals/ChooseFile";

function EditGallery(props) {
  const { handleClose, galleryDetails } = props;
  const [status, setStatus] = useState(true);
  const { mutate, isLoading } = useEditGallery();
  const [fileURL, setFileURL] = useState("");
  const methods = useForm();

  useEffect(() => {
    if (galleryDetails) {
      methods.setValue("caption", galleryDetails.caption);
      methods.setValue("order", galleryDetails.order);
      setFileURL(galleryDetails.image || "");
      setStatus(galleryDetails.is_active);
    }
  }, [galleryDetails, methods]);

  const onUpdateGallery = async (data) => {
    const gallery = {
      image: fileURL,
      caption: data.caption || "",
      order: Number(data.order) || 0,
      is_active: status,
    };
    await mutate(
      { id: galleryDetails.id, data: gallery },
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
        onSubmit={methods.handleSubmit(onUpdateGallery)}
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

EditGallery.propTypes = {
  handleClose: PropTypes.func.isRequired,
  galleryDetails: PropTypes.object,
};

export default EditGallery;
