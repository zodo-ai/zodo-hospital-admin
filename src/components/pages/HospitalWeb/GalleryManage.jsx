import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import GalleryTable from "../../Tables/GalleryTable";
import { useGallery } from "../../../hooks/hospitalWeb/useGallery";
import { useAuth } from "../../../hooks/useAuth";
import SideModal from "../../modals/SideModal";
import AddGallery from "../../modals/Gallery/AddGallery";

function GalleryManage() {
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
      name: "Gallery",
      status: "active",
      link: "/hospital-web/gallery",
    },
  ];
  
  const { data: galleryList, isLoading } = useGallery(hospitalId);

  // Filter gallery based on search term
  const filteredGallery = galleryList?.filter((gallery) => 
    (gallery.caption && gallery.caption.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout activeClassName="hw-gallery" id="menu-item-hw" id1="menu-items-hw">
      <div className="page-wrapper pb-3">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Gallery Details" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Gallery Images"
            handleSearchterm={handleSearch}
            buttonTitle="Add Gallery"
          />
          <GalleryTable galleryList={filteredGallery} isLoading={isLoading} />
        </div>
      </div>
      <SideModal show={showAdd} handleClose={() => setShowAdd(false)} title="Add Gallery">
        <AddGallery handleClose={() => setShowAdd(false)} />
      </SideModal>
    </Layout>
  );
}

export default GalleryManage;
