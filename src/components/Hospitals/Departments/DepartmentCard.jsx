import { useState } from "react";
// import { right_chevron } from "../../imagepath";
import PropTypes from "prop-types";
import { bin_icon_red, pencil_icon, three_dots_menu } from "../../imagepath";
import { Link } from "react-router-dom";
import ConfirmDelete from "../../modals/ConfirmDelete";
import useDeleteDepartment from "../../../hooks/departments/useDeleteDepartment";
import CenteredModal from "../../modals/CenteredModal";
import DepartmentEditForm from "./DepartmentEditForm";
import StatusBadge from "../../assests/StatusBadge";

function DepartmentCard(props) {
  const { data, setActiveDropdown } = props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { mutate, isLoading } = useDeleteDepartment();
  const handleDelete = async () => {
    const depatmentId = data?.id;
    await mutate(depatmentId);
  };
  const handleCloseEditModal = ()=>{
    setShowEdit(false);
  }  
  return (
    <div className="dash-content dash-count flex-grow-1 department-card">
      <div className="row">
        <h6 className="col-10">{data?.name}</h6>
        <div className="col-2 d-flex justify-content-end">
          <div className="dropdown">
            <Link
              // className="dropdown-toggle"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setActiveDropdown(data?.id)}
            >
              <img src={three_dots_menu} alt="" width={15} height={15} />
            </Link>
            <div className="dropdown-menu">
              <Link 
              className="dropdown-item"
              onClick={()=>setShowEdit(true)}
              >
                <img
                  src={pencil_icon}
                  alt="edit"
                  className="dropdown-menu-icon"
                />
                <span>Edit</span>
              </Link>
              <div className="dropdown-divider" />
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => setShow(true)}
              >
                <img
                  src={bin_icon_red}
                  alt="delete"
                  className="dropdown-menu-icon"
                />
                <span className="text-danger">Delete</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <StatusBadge status={data?.status}/>
        </div>
      </div>

      <ConfirmDelete
        setShow={setShow}
        show={show}
        title="Department"
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
      <CenteredModal
        show={showEdit}
        handleClose={handleCloseEditModal}
        title="Edit Department"
      >
        <DepartmentEditForm handleClose={handleCloseEditModal} departmentId={data?.id} />
      </CenteredModal>
    </div>
  );
}
DepartmentCard.propTypes = {
  data: PropTypes.node,
  setActiveDropdown: PropTypes.func,
};

export default DepartmentCard;
