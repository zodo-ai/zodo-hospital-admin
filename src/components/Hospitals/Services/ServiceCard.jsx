import { useState } from "react";
import { Link } from "react-router-dom";
import { three_dots_menu } from "../../imagepath";
import PropTypes from "prop-types";
import ConfirmDelete from "../../modals/ConfirmDelete";
import useDeleteHospitalServices from "../../../hooks/hospital-services/useDeleteHospitalService";
import CenteredModal from "../../modals/CenteredModal";
import EditServiceForm from "../../modals/AddService/EditServiceForm";
import ImageBox from "../../assests/ImageBox";
import ServiceDetails from "./ServiceDetails";
import SideModal from "../../modals/SideModal";
function ServiceCard(props) {
  const { servicesData } = props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { mutate, isLoading } = useDeleteHospitalServices();
  const handleDelete = async () => {
    const depatmentId = servicesData?.id;
    await mutate(depatmentId);
  };
  const [showService, setShowService] = useState(false);
  const handleCloseEditModal = () => {
    setShowEdit(false);
  };

  return (
    <div className="card invoices-grid-card w-100">
      <Link to>
        <div className="card-body">
          <div className="row align-items-center hospital-card">
            <div className="col-3">
              <Link to="#">
                <ImageBox
                  src={servicesData?.image}
                  alt="Service Image"
                  width="100px"
                  height="100%"
                />
              </Link>
            </div>
            <div className="col-9 d-flex justify-content-end pe-4">
              <div className="dropdown">
                <Link
                  // className="dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={three_dots_menu} alt="" width={15} height={15} />
                </Link>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to
                    onClick={() => setShowService(true)}
                  >
                    <i className="far fa-eye me-2" />
                    View
                  </Link>
                  <div className="dropdown-divider" />

                  <Link
                    className="dropdown-item"
                    to
                    onClick={() => setShowEdit(true)}
                  >
                    <i className="far fa-edit me-2" />
                    Edit
                  </Link>
                  <div className="dropdown-divider" />

                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => setShow(true)}
                  >
                    <i className="fa fa-trash-alt m-r-5"></i> Delete
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <h5 className="service-title">{servicesData.name}</h5>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col text-secondary align-middle">
                <p>DAILY BOOKINGS COUNT</p>
              </div>
              <div className="col-auto">
                <h5>{servicesData?.daily_booking_count}</h5>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-secondary align-middle">
                <p>PRICE</p>
              </div>
              <div className="col-auto">
                <h5>₹ {servicesData?.price}</h5>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-secondary align-middle">
                <p>DISCOUNTED PRICE</p>
              </div>
              <div className="col-auto">
                <h5>₹ {servicesData?.strike_through_price}</h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <ConfirmDelete
        setShow={setShow}
        show={show}
        title="Service"
        handleDelete={handleDelete}
        isLoading={isLoading}
      />

      <CenteredModal
        show={showEdit}
        handleClose={handleCloseEditModal}
        title="Edit Service"
      >
        <EditServiceForm
          handleClose={handleCloseEditModal}
          selectedService={servicesData?.id}
        />
      </CenteredModal>

      <SideModal
        show={showService}
        handleClose={() => setShowService(false)}
        title={"Service Details"}
      >
        <ServiceDetails data={servicesData} />
      </SideModal>
    </div>
  );
}

ServiceCard.propTypes = {
  servicesData: PropTypes.node,
};

export default ServiceCard;
