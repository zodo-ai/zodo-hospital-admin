import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import BannersTable from "../../Tables/BannersTable";
import { useBanners } from "../../../hooks/hospitalWeb/useBanners";
import { useAuth } from "../../../hooks/useAuth";
import SideModal from "../../modals/SideModal";
import AddBanner from "../../modals/Banners/AddBanner";

function BannersManage() {
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
      name: "Banners",
      status: "active",
      link: "/hospital-web/banners",
    },
  ];
  
  const { data: bannersList, isLoading } = useBanners(hospitalId);

  // Filter banners based on search term
  const filteredBanners = bannersList?.filter((banner) => 
    (banner.title && banner.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (banner.subtitle && banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout activeClassName="hw-banners" id="menu-item-hw" id1="menu-items-hw">
      <div className="page-wrapper pb-3">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Banners Details" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Banners"
            handleSearchterm={handleSearch}
            buttonTitle="Add Banner"
          />
          <BannersTable bannersList={filteredBanners} isLoading={isLoading} />
        </div>
      </div>
      <SideModal show={showAdd} handleClose={() => setShowAdd(false)} title="Add Banner">
        <AddBanner handleClose={() => setShowAdd(false)} />
      </SideModal>
    </Layout>
  );
}

export default BannersManage;
