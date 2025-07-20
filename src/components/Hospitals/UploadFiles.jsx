import Dropzone from "react-dropzone";
import { useUploadFile } from "../../hooks/useUploadFile";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { pdf_icon } from "../imagepath";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ComponentLoader from "../loaders/ComponentLoader";
import {useRemoveDocuments} from "../../hooks/documents/useRemoveDocument";
import {useDeleteDocument} from "../../hooks/documents/useDeleteDocument";
function UploadFiles(props) {
  const { fileDetails, setFileDetails } = props;
  const { mutate: removeDocument, isLoading: removeLoading } =
    useRemoveDocuments();
  const { mutate: deleteDocument, isLoading: deleteLoading } =
    useDeleteDocument();
  // const [fileurl, setFileurl] = useState("");
  // const [loading, setLoading] = useState(false);

  const { mutate: uploadDocument, isLoading: documentLoading } =
    useUploadFile();

  const handleFile = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    // setLoading(true);
    try {
      uploadDocument(formData, {
        onSuccess: (response) => {
          const message = "File uploaded successfully";
          toast.success(message);
          setFileDetails({
            ...fileDetails,
            name: response?.data?.filename,
            id: null,
            key: response?.data?.key,
          });
          // setLoading(false);
        },
      });
    } catch (error) {
      setFileDetails(null);
      const message = "File uploaded failed";
      toast.error(message);
    }
  };

  const clearFile = (id, key) => {
    if (id) {
      deleteDocument(id, {
        onSuccess: () => {
          setFileDetails(null);
          setFileDetails({
            name: null,
            id: null,
            key: null,
          });
        },
      });
    } else if (key) {
      const data = { fileId: key };
      removeDocument(data, {
        onSuccess: () => {
          setFileDetails(null);
          // handleFileKey("");
        },
      });
    }
  };

  return (
    <Dropzone onDrop={handleFile}>
      {({ getRootProps, getInputProps }) => (
        <section className="hospital-file-upload">
          {!documentLoading || removeLoading || deleteLoading ? (
            !fileDetails?.name ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="pt-2">
                  Drag and Drop to Upload or{" "}
                  <span className="text-primary">Browse </span>
                </p>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                {/* <div className="d-flex align-items-center justify-content-center"> */}
                <div className="bg-white position-relative preview-container text-center">
                  <div className="pdf-btn pt-2 pb-2">
                    <img src={pdf_icon} alt="pdf_icon" width={50} height={50} />
                  </div>
                  <div className="preview-file-text">
                    <h6>{fileDetails?.name}</h6>
                  </div>
                  <Link
                    to="#"
                    className="btn-icon logo-hide-btn position-absolute upload-close-btn"
                  >
                    <i
                      className="feather-x-circle crossmark"
                      onClick={() => clearFile(fileDetails.id, fileDetails.key)}
                    >
                      <FeatherIcon icon="x-circle" />
                    </i>
                  </Link>
                </div>
                {/* </div> */}
                {/* <div className="d-flex align-items-center w-100">
                  <div className="d-flex align-items-center justify-content-center">
                    <img src={pdf_icon} alt="pdf_icon" />
                    <div className="d-flex flex-column justify-content-center file-details ms-2 upload-document-name">
                      <h6>{fileDetails?.name}</h6>
                    </div>

                    <Link
                      onClick={() => clearFile(fileDetails?.file)}
                      className="ms-2"
                    >
                      <img src={cross_icon} alt="" />
                    </Link>
                  </div>
                </div> */}
              </div>
            )
          ) : (
            <ComponentLoader />
          )}
        </section>
      )}
    </Dropzone>
  );
}
UploadFiles.propTypes = {
  // handleFileKey: PropTypes.func,
  fileDetails: PropTypes.string,
  setFileDetails: PropTypes.func,
};
export default UploadFiles;
