import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";

import { useForm, FormProvider } from "react-hook-form";
import SelectField from "../../Inputfields/SelectField";
import InputField from "../../Inputfields/InputField";
import TextArea from "../../Inputfields/TextArea";
import { Button } from "react-bootstrap";
import { ProfileUser } from "../../imagepath";
import { useAuth } from "../../../hooks/useAuth";
import { useDoctorsList } from "../../../hooks/doctors/useDoctorsList";
import { useHospitalServices } from "../../../hooks/hospital-services/useHospitalServices";
import { useAudienceCount } from "../../../hooks/whatsapp/useAudienceCount";
import { useSendCampaign } from "../../../hooks/whatsapp/useSendCampaign";
import ChooseFile from "../../Hospitals/ChooseFile";



const WhatsappMarketing = () => {
  const methods = useForm();
  const { hospitalId } = useAuth();

  const [count, setCount] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // 🔹 Fetch Doctors & Services
  const { data: doctorsList } = useDoctorsList(hospitalId);
  const { data: servicesList } = useHospitalServices(hospitalId);

  const doctorOptions = [
    { label: "All Doctors", value: "" },
    ...(doctorsList?.map((doc) => ({
      label: doc.name,
      value: doc.id,
    })) || []),
  ];

  const serviceOptions = [
    { label: "All Services", value: "" },
    ...(servicesList?.map((srv) => ({
      label: srv.name,
      value: srv.id,
    })) || []),
  ];

  // 🔹 Hooks
  const { mutate: getCount, isPending: countLoading } = useAudienceCount();
  const { mutate: sendCampaign, isPending: sending } = useSendCampaign();
  // const { mutate: upload, isPending: uploading } = useFileUpload();

  const breadCrumpData = [
    {
      name: "WhatsApp Marketing",
      status: "active",
      link: "/whatsapp-marketing",
    },
  ];

  // 🔹 Audience Count
  const getAudienceCountHandler = () => {
    const values = methods.getValues();

    const params = {
      hospitalId,
    };

    if (values.doctorId?.value) {
      params.doctorId = values.doctorId.value;
    }

    if (values.serviceId?.value) {
      params.serviceId = values.serviceId.value;
    }

    if (values.startDate) {
      params.startDate = values.startDate;
    }

    if (values.endDate) {
      params.endDate = values.endDate;
    }

    getCount(params, {
      onSuccess: (res) => {
        setCount(res?.count || 0);
      },
    });
  };

  // 🔹 Submit Campaign
  const onSubmit = (data) => {
    sendCampaign(
      {
        hospitalId,
        doctorId: data.doctorId?.value,
        serviceId: data.serviceId?.value,
        startDate: data.startDate,
        endDate: data.endDate,
        text: data.text,
        imageUrl,
        link: data.link,
      },
      {
        onSuccess: () => {
          methods.reset();     
          setImageUrl("");     
          setCount(null);      
        },
      }
    );
  };

  return (
    <Layout activeClassName="whatsapp-marketing">
      <div className="page-wrapper pb-3">
        <div className="content">

          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="WhatsApp Marketing" />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>

              <div className="row g-4">

                {/* LEFT CARD */}
                <div className="col-md-6">
                  <div className="bg-white shadow-sm ">

                    <div className="d-flex align-items-center gap-2 px-4 py-3 border-bottom bg-teal-50 text-teal-700 fw-semibold">
                      <i className="fa fa-filter"></i>
                      <h6 className="mb-0">Audience Filters</h6>
                    </div>

                    <div className="p-4">

                      <div className="row g-3">
                        <div className="col-md-6">
                          <SelectField
                            name="doctorId"
                            label="Doctor"
                            options={doctorOptions}
                          />
                        </div>

                        <div className="col-md-6">
                          <SelectField
                            name="serviceId"
                            label="Service"
                            options={serviceOptions}
                          />
                        </div>
                      </div>

                      <div className="row g-3 mt-1">
                        <div className="col-md-6">
                          <InputField name="startDate" label="Start Date" type="date" />
                        </div>

                        <div className="col-md-6">
                          <InputField name="endDate" label="End Date" type="date" />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between text-muted mt-3 small">
                        <div className="d-flex align-items-center gap-2">
                          <img src={ProfileUser} alt="users" width={18} />
                          <div>Estimated reach</div>
                        </div>
                        <strong>{count ?? "--"}</strong>
                      </div>

                      <Button
                        variant="primary"
                        type="button"
                        className="w-100 mt-3"
                        onClick={getAudienceCountHandler}
                        disabled={countLoading}
                      >
                        {countLoading && (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span className="ps-2">
                          Check Audience Count
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* RIGHT CARD */}
                <div className="col-md-6">
                  <div className="bg-white shadow-sm">

                    <div className="d-flex align-items-center gap-2 px-4 py-3 border-bottom bg-teal-50 text-teal-700 fw-semibold">
                      <i className="fa fa-comment"></i>
                      <h6 className="mb-0">Campaign Content</h6>
                    </div>

                    <div className="p-4">

                      <TextArea
                        name="text"
                        label="Message"
                        validation={{ required: "Message is required" }}
                      />

                      {/* 🔹 File Upload */}
                      <div className="mt-3">
                        <label className="form-label">Upload Image</label>

                        <ChooseFile
                          fileURL={imageUrl}
                          handleFileURL={(url) => setImageUrl(url)}
                        />
                      </div>

                      <div className="mt-3">
                        <InputField name="link" label="Link" />
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mt-3"
                        disabled={sending}
                      >
                        {sending && (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span className="ps-2">Send Campaign</span>
                      </Button>

                    </div>
                  </div>
                </div>

              </div>

            </form>
          </FormProvider>
        </div>
      </div>
    </Layout>
  );
};

export default WhatsappMarketing;