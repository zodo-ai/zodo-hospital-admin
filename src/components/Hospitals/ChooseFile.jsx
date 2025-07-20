import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ComponentLoader from "../loaders/ComponentLoader";
import { useUploadFile } from "../../hooks/useUploadFile";

function ChooseFile(props) {
  const { handleFileURL, fileURL } = props;
  // useEffect(() => {
  //   setFile(fileURL);
  // }, [fileURL]);

  // const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  const { mutate, isLoading } = useUploadFile();
  const handleFiles = async (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      // setUploadStatus("File size exceeds 2MB limit");
      e.target.value = ""; // Clear the input
      const message = "File size exceeds 2MB limit";
      toast.error(message);
    } else {
      // setFile(file);
      const formData = new FormData();
      formData.append("file", file);
      // setLoading(true);
      try {
        const response = await mutate(formData, {
          onSuccess: () => {
            const message = "File uploaded successfully";
            toast.success(message);
          },
        });
        // setFile(response?.data?.url);
        handleFileURL(response?.data?.url);
      } catch (error) {
        handleFileURL("");
        const message = "File uploaded failed";
        toast.error(message);
      }
    }
  };
  return (
   
    <div className="row">
      <div className="col-md-1 upload-preview ms-2">
        {!fileURL ? (
          <small className="text-muted text-center">Perview</small>
        ) : (
          <>
            {!isLoading ? (
              <img src={fileURL} alt="logo" width={100} height={100} />
            ) : (
              <ComponentLoader />
            )}
          </>
        )}
      </div>
      <div className="col ms-md-2">
        <div>
          <small className="w-25 text-muted">Please upload square image.</small>
        </div>
        <div>
          <small className="w-25 text-muted">size less than 2 MB</small>
        </div>
        <a
          className="choose-file-btn mt-2 bg-white"
          onClick={handleButtonClick}
        >
          <input
            type="file"
            className="form-control d-none"
            id="fileInput"
            onChange={handleFiles}
            accept="image/jpeg, image/png, image/gif"
          />
          <span className="choose-file-text">Choose file</span>
        </a>
      </div>
    </div>
  );
}

ChooseFile.propTypes = {
  handleFileURL: PropTypes.func,
  fileURL: PropTypes.string,
};
export default ChooseFile;
