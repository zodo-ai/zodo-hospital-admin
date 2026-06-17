import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import TestimonialsTable from "../../Tables/TestimonialsTable";
import { useTestimonials } from "../../../hooks/hospitalWeb/useTestimonials";
import { useAuth } from "../../../hooks/useAuth";
import SideModal from "../../modals/SideModal";
import AddTestimonial from "../../modals/Testimonials/AddTestimonial";

function TestimonialsManage() {
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { hospitalId } = useAuth();

  const handleShow = () => {
    setShowAdd(true);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const breadCrumpData = [
    {
      name: "Hospital Web",
      status: "active",
      link: "#",
    },
    {
      name: "Testimonials",
      status: "active",
      link: "/hospital-web/testimonials",
    },
  ];
  
  const { data: testimonialsList, isLoading } = useTestimonials(hospitalId);

  // Filter testimonials based on search term
  const filteredTestimonials = testimonialsList?.filter((testimonial) => 
    (testimonial.patient_name && testimonial.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (testimonial.message && testimonial.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout activeClassName="hw-testimonials" id="menu-item-hw" id1="menu-items-hw">
      <div className="page-wrapper pb-3">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Testimonials Details" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Testimonials"
            handleSearchterm={handleSearch}
            buttonTitle="Add Testimonial"
          />
          <TestimonialsTable testimonialsList={filteredTestimonials} isLoading={isLoading} />
        </div>
      </div>
      <SideModal show={showAdd} handleClose={() => setShowAdd(false)} title="Add Testimonial">
        <AddTestimonial handleClose={() => setShowAdd(false)} />
      </SideModal>
    </Layout>
  );
}

export default TestimonialsManage;
