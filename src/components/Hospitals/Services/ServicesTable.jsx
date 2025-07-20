import PropTypes from "prop-types";
import React from "react";
import { user_profile } from "../../imagepath";
import DataTable from "../../Tables/DataTable";

function ServicesTable(props) {
  const { selectedService } = props;
  console.log(selectedService);
  const columns = [
    {
      title: "Staff Name",
      dataIndex: "first_name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (item, record) => (
        <div className="d-flex">
          <img src={user_profile} width={35} height={35} alt="" />
          <div className="ms-2 table-text">
            <h6>
              {item} {record?.last_name}
            </h6>
            <p>{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      // sorter: (a, b) => a.empid.length - b.empid.length,
    },

    {
      title: "Joining Date",
      dataIndex: "created_at",
      // render:(item, record)=>{
      //   const date = record?.created_at;
      //   const dateOnly = new Date(date).toLocaleDateString();
      //   return (
      //     <div>{dateOnly}</div>
      //   )
      // }
      // sorter: (a, b) => a.joiningDate.length - b.joiningDate.length,
    },
    {
      title: "Department",
      dataIndex: "",
      // sorter: (a, b) => a.department.length - b.department.length,
      render: (item, record) => {
        // const department = record?.departments[0]
        // console.log("Department ",record?.departments);
        const departmentLen = record?.departments?.length;
        const departments =
          departmentLen !== 0 &&
          record?.departments?.reduce((acc, current) => {
            return acc + current.name + `${departmentLen !== 0 ? "" : ","} `;
          }, "");
        return <div>{departments}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "user_type",
      // sorter: (a, b) => a.pricing.length - b.pricing.length,
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   render: (item, record) => (
    //     <>
    //       <div className="text-end">
    //         <div className="dropdown dropdown-action">
    //           <Link
    //             to="#"
    //             className="action-icon dropdown-toggle"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             <i className="fas fa-ellipsis-v" />
    //           </Link>
    //           <div className="dropdown-menu dropdown-menu-end">

    //             <Link
    //               className="dropdown-item"
    //               to
    //               onClick={() => handleEditClick(record.id, record.user_type)}
    //             >
    //               <i className="far fa-edit me-2" />
    //               Edit
    //             </Link>
    //             <Link
    //               className="dropdown-item"
    //               to="#"
    //               onClick={() => handleDeleteClick(record.id)}
    //             >
    //               <i className="fa fa-trash-alt m-r-5"></i> Delete
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <DataTable columns={columns} dataSource={[]} />
    </>
  );
}

ServicesTable.propTypes = {
  selectedService: PropTypes.node,
};

export default ServicesTable;
