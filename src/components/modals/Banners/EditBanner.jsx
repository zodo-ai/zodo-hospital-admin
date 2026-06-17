import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEditBanner } from "../../../hooks/hospitalWeb/useEditBanner";
import ChooseFile from "../../Hospitals/ChooseFile";

function EditBanner(props) {
  const { handleClose, bannerDetails } = props;
  const [status, setStatus] = useState(true);
  const { mutate, isLoading } = useEditBanner();
  const [fileURL, setFileURL] = useState("");
  const methods = useForm();

  useEffect(() => {
    if (bannerDetails) {
      methods.setValue("title", bannerDetails.title);
      methods.setValue("subtitle", bannerDetails.subtitle);
      methods.setValue("url", bannerDetails.url);
      methods.setValue("order", bannerDetails.order);
      setFileURL(bannerDetails.image || "");
      setStatus(bannerDetails.is_active);
    }
  }, [bannerDetails, methods]);

  const onUpdateBanner = async (data) => {
    const banner = {
      title: data.title,
      subtitle: data.subtitle || "",
      image: fileURL,
      url: data.url || "",
      order: Number(data.order) || 0,
      is_active: status,
    };
    await mutate(
      { id: bannerDetails.id, data: banner },
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
        onSubmit={methods.handleSubmit(onUpdateBanner)}
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
                name="title"
                label="Banner Title"
                validation={{ required: "Title is required" }}
                placeholder="Enter title"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <InputField
                name="subtitle"
                label="Subtitle"
                placeholder="Enter subtitle"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="url"
                label="Redirect URL"
                placeholder="Enter URL"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
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

EditBanner.propTypes = {
  handleClose: PropTypes.func.isRequired,
  bannerDetails: PropTypes.object,
};

export default EditBanner;
