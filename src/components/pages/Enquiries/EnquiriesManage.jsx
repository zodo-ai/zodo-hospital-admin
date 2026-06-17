import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import EnquiriesTable from "../../Tables/EnquiriesTable";
import { useEnquiries } from "../../../hooks/enquiries/useEnquiries";
import { useAuth } from "../../../hooks/useAuth";

function EnquiriesManage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { hospitalId } = useAuth();

  const handleSearchInput = (value) => {
    setSearchTerm(value);
  };

  const breadCrumpData = [
    {
      name: "Enquiries",
      status: "active",
      link: "/enquiries",
    },
  ];
  
  const query = searchTerm ? `search=${searchTerm}` : "";
  const { data: enquiriesList, isLoading } = useEnquiries(hospitalId, query);

  return (
    <Layout activeClassName="enquiries" id="menu-item-enquiries" id1="menu-items-enquiries">
      <div className="page-wrapper pb-3">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Enquiries Details" />
          
          <div className="page-header invoices-page-header">
            <div className="d-flex flex-column flex-md-row">
              <div className="w-md-50 w-100 d-flex align-items-md-center flex-column flex-md-row">
                <div className="search-hero-header w-25">
                  <h3>All Enquiries</h3>
                </div>
                <div className="ms-md-3 w-md-50 w-100">
                  <div>
                    <div className="form-group has-search">
                      <span className="fa fa-search form-control-feedback"></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => handleSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <EnquiriesTable enquiriesList={enquiriesList} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}

export default EnquiriesManage;
