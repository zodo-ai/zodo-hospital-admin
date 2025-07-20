import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ChooseFile from "./ChooseFile";
import UploadFiles from "./UploadFiles";
import InputField from "../Inputfields/InputField";
import FasttagToggle from "../FasttagRevenue/FasttagToggle";
import TextArea from "../Inputfields/TextArea";
import { useAuth } from "../../hooks/useAuth";
import { useViewHospital } from "../../hooks/hospital/useViewHospital";
import { useNavigate } from "react-router-dom";
import { useEditHostpital } from "../../hooks/hospital/useEditHospitals";
import FullscreenLoader from "../loaders/FullscreenLoader";
import { toast } from "react-toastify";
import SelectField from "../Inputfields/SelectField";
import { useGetDistrict } from "../../hooks/useGetDistrict";
import { useHospitalDocuments } from "../../hooks/hospital/useHospitalDocuments";
function EditHospitalForm() {
  const methods = useForm();
  const { hospitalId } = useAuth();
  const [fileURL, setFileURL] = useState("");
  const navigate = useNavigate();
  const { data: hospitalDetails, isLoading: viewLoading } =
    useViewHospital(hospitalId);
  const [toggleFasttag, setToggleFasttag] = useState(false);
  const { mutate, isLoading } = useEditHostpital();
  const { data: districts, isLoading: districtLoading } = useGetDistrict();
  const districtOptions = districts?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const { data: hospitalDocuments, isLoading: documentLoading } =
    useHospitalDocuments(hospitalId);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  useEffect(() => {
    if (hospitalDocuments?.length > 0) {
      setFile1({
        name: hospitalDocuments[0]?.name,
        key: hospitalDocuments[0]?.key,
        id: hospitalDocuments[0]?.id,
      });
      setFile2({
        name: hospitalDocuments[1]?.name,
        key: hospitalDocuments[1]?.key,
        id: hospitalDocuments[1]?.id,
      });
      setFile3({
        name: hospitalDocuments[2]?.name,
        key: hospitalDocuments[2]?.key,
        id: hospitalDocuments[2]?.id,
      });
    }
  }, [hospitalDocuments]);

  useEffect(() => {
    if (hospitalDetails) {
      setFileURL(hospitalDetails?.logo || "");
      const fastTag = hospitalDetails?.fastTag?.enabled;
      setToggleFasttag(fastTag);
      const district = hospitalDetails?.address?.district;
      const billingDistrict = hospitalDetails?.billing_address?.district;
      const districtOption = { label: district, value: district };
      const billingDistrictOption = {
        label: billingDistrict,
        value: billingDistrict,
      };
      methods.reset({
        hospitalName: hospitalDetails?.name,
        email: hospitalDetails?.contact_details?.email,
        phone: hospitalDetails?.contact_details?.mobile,
        fastTagcount: hospitalDetails?.fastTag?.count,
        website: hospitalDetails?.contact_details?.website,
        gstnumber: hospitalDetails?.gst,
        companyName: hospitalDetails?.address?.lineOne,
        street: hospitalDetails?.address?.city,
        address: hospitalDetails?.address?.lineTwo,
        town: hospitalDetails?.address?.city,
        district: districtOption,
        state: hospitalDetails?.address?.state,
        pincode: hospitalDetails?.address?.pincode,
        accountNumber: hospitalDetails?.bank_details?.account_number,
        verifyAccountnumber: hospitalDetails?.bank_details?.account_number,
        accountHoldername: hospitalDetails?.bank_details?.account_holder,
        bankname: hospitalDetails?.bank_details?.bank_name,
        ifsc: hospitalDetails?.bank_details?.ifsc,
        upiid: hospitalDetails?.bank_details?.upi_id,
        billingAccountHoldername: hospitalDetails?.billing_address?.lineOne,
        fasttagPrice: hospitalDetails?.fastTag?.price,

        billingStreet: hospitalDetails?.billing_address?.city,
        billingAddress: hospitalDetails?.billing_address?.lineTwo,
        billingTown: hospitalDetails?.billing_address?.city,
        billingDistrict: billingDistrictOption,
        billingState: hospitalDetails?.billing_address?.state,
        billingPincode: hospitalDetails?.billing_address?.pincode,
      });
    }
  }, [hospitalDetails, methods]);

  const onEditHospital = async (data) => {
    if (data.accountNumber === data.verifyAccountnumber) {
      const file1Details = {
        name: file1?.name,
        file: file1?.key || file1?.file,
      };
      const file2Details = {
        name: file2?.name,
        file: file2?.key || file2?.file,
      };
      const file3Details = {
        name: file3?.name,
        file: file3?.key || file3?.file,
      };
      const fileArray = [file1Details, file2Details, file3Details].filter(
        (file) => file.name && file.file
      );

      const hospital = {
        name: data?.hospitalName,
        logo: fileURL,
        location: data?.town,
        address: {
          lineOne: data?.companyName,
          lineTwo: data?.address,
          city: data?.town,
          district: data?.district.value,
          state: data?.state,
          pincode: data?.pincode,
          street: data?.street,
        },
        billing_address: {
          lineOne: data?.billingAccountHoldername,
          lineTwo: data?.billingAddress,
          city: data?.billingTown,
          district: data?.billingDistrict?.value,
          state: data?.billingState,
          pincode: data?.billingPincode,
          street: data?.billingStreet,
        },
        fastTag: {
          enabled: toggleFasttag,
          count: parseInt(data?.fastTagcount),
          price: toggleFasttag ? parseInt(data?.fasttagPrice) : 0,
        },
        bank_details: {
          account_number: data?.accountNumber,
          account_holder: data?.accountHoldername,
          ifsc: data?.ifsc,
          bank_name: data?.bankname,
          upi_id: data?.upiid,
        },
        contact_details: {
          email: data?.email,
          mobile: data?.phone,
          website: data?.website,
        },
        gst: data?.gstnumber,
        documents: fileArray,
      };
      // console.log("hospital !!", hospital);
      // console.log(mutate);
      await mutate({ id: hospitalId, data: hospital });
      // methods.reset();
    } else {
      const errorMessage = "Account number mismatch";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleFileURL = (url) => {
    setFileURL(url);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded p-4 mt-3"
        onSubmit={methods.handleSubmit(onEditHospital)}
      >
        <div className="row mt-4">
          <div className="col-md-8 ms-md-3">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
        </div>
        <div className="w-100 mt-4 mt-md-2">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <InputField
                  name="hospitalName"
                  label="Hospital Name"
                  validation={{ required: "Hospital Name is required" }}
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputField
                  name="email"
                  label="Contact email"
                  validation={{ required: "Contact email is required" }}
                  placeholder=""
                  type="email"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="phone"
                label="Contact number"
                validation={{ required: "Contact number is required" }}
                placeholder=""
                type="text"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <InputField
                name="website"
                label="Hospital Website"
                // validation={{ required: "Hospital Website is required" }}
                placeholder="Enter hospital website"
                type="text"
              />
            </div>
          </div>
        </div>
        <h4 className="card-title">GSTIN</h4>
        <div className="w-50">
          <InputField
            name="gstnumber"
            label="GST Number"
            validation={{ required: "GST Number is required" }}
            placeholder="GST Number"
            type="text"
          />
        </div>

        <h4 className="card-title mt-4">Fast Tag</h4>
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex pt-5">
              <label className="">Enable Fast Tag</label>
              <div className="ms-2">
                <FasttagToggle
                  setToggleFasttag={setToggleFasttag}
                  toggleFasttag={toggleFasttag}
                />
              </div>
            </div>
          </div>
          {toggleFasttag && (
            <div className="col-md-4">
              <InputField
                name="fastTagcount"
                label="Fasttag Count"
                // validation={{ required: "Fasttag issues per day is required" }}
                placeholder="Fasttag issues per day"
                type="number"
                disabled={!toggleFasttag}
              />
            </div>
          )}
          {toggleFasttag &&
          (
            <div className="col-md-4">
              <InputField
                name="fasttagPrice"
                label="Fasttag Price"
                // validation={{ required: "Fasttag issues per day is required" }}
                placeholder="Fasttag Price"
                type="price"
                disabled={!toggleFasttag}
              />
            </div>
          )}
        </div>

        <div className="row mt-4">
          {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>Choose Percentage of Profit</label>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={option}
                      />
                    </div>
                  </div> */}
          {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>Fast tag Issue Per Day</label>
                      <Select
                      // defaultValue={selectedOption}
                      // onChange={setSelectedOption}
                      // options={option}
                      />
                    </div>
                  </div> */}
        </div>

        <h4 className="card-title mt-1">Hospital Location</h4>
        <div className="row">
          <div className="col-md-4">
            <InputField
              name="companyName"
              label=""
              validation={{ required: "Company name is required" }}
              placeholder="Company Name"
              type="text"
            />
          </div>

          <div className="col-md-8">
            <InputField
              name="street"
              label=""
              validation={{ required: "Street is required" }}
              placeholder="Area / Street / Sector"
              type="text"
            />
          </div>
        </div>

        <div className="form-group mt-2">
          <TextArea
            name="address"
            label=""
            validation={{ required: "Address is required" }}
            placeholder="Enter Address"
          />
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="form-group">
              <InputField
                name="town"
                label=""
                validation={{ required: "Town is required" }}
                placeholder="Town"
                type="text"
              />
            </div>
          </div>

          <div className="col-md-5">
            <div className="form-group">
              {/* <InputField
                        name="district"
                        label=""
                        validation={{ required: "District is required" }}
                        placeholder="District"
                        type="text"
                      /> */}

              <SelectField
                options={districtOptions || []}
                label=""
                isLoading={districtLoading}
                name="district"
                isMultiSelect={false}
                placeholder="Select District"
                validationMessage="District is required"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="form-group">
              <InputField
                name="state"
                label=""
                validation={{ required: "State is required" }}
                placeholder="State"
                type="text"
              />
            </div>
          </div>

          <div className="col-md-5">
            <div className="form-group">
              <InputField
                name="pincode"
                label=""
                validation={{ required: "Pincode is required" }}
                placeholder="Pincode"
                type="text"
              />
            </div>
          </div>
        </div>

        <h4 className="card-title mt-3">Add Bank Account</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="accountNumber"
                label=""
                validation={{ required: "Account Number is required" }}
                placeholder="Account Number"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="verifyAccountnumber"
                label=""
                validation={{ required: "Account Number is required" }}
                placeholder="Verify Account Number"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="accountHoldername"
                label=""
                validation={{
                  required: "Account Holder Name is required",
                }}
                placeholder="Account Holder Name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="bankname"
                label=""
                validation={{ required: "Bank name is required" }}
                placeholder="Bank name"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="ifsc"
                label=""
                validation={{ required: "IFSC Code is required" }}
                placeholder="IFSC"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <InputField
                name="upiid"
                label=""
                // validation={{ required: "IFSC Code is required" }}
                placeholder="Upi id (optional)"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="billingAccountHoldername"
                label=""
                validation={{
                  required: "Account Holder Name is required",
                }}
                placeholder="Account Holder Name"
                type="text"
                // disabled={isSameAsCompanyAddress}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <InputField
                name="billingStreet"
                label=""
                validation={{ required: "Street is required" }}
                placeholder="Area / Street / Sector"
                type="text"
                // disabled={isSameAsCompanyAddress}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <TextArea
            name="billingAddress"
            label=""
            validation={{ required: "Address is required" }}
            placeholder="Enter Address"
            // disabled={isSameAsCompanyAddress}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="billingTown"
                label=""
                validation={{ required: "Town is required" }}
                placeholder="Town / City"
                type="text"
                // disabled={isSameAsCompanyAddress}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <SelectField
                options={districtOptions || []}
                label=""
                isLoading={districtLoading}
                name="billingDistrict"
                isMultiSelect={false}
                placeholder="Select District"
                validationMessage="Billing District is required"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="billingState"
                label=""
                validation={{ required: "State is required" }}
                placeholder="State"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="billingPincode"
                label=""
                validation={{ required: "Pincode is required" }}
                placeholder="Pincode"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* <div className="mt-4">
          <div className="edit-hospital">
            <h4>Related Documents</h4>
            <p>upload related documents to complete the process</p>
          </div>
          <div className="row mt-4 pb-5">
            <div className="col-md-4 mt-2">
              <UploadFiles />
            </div>
            <div className="col-md-4 mt-2">
              <UploadFiles />
            </div>
            <div className="col-md-4 mt-2">
              <UploadFiles />
            </div>
          </div>
        </div> */}

        <div className="mt-4">
          <div className="edit-hospital">
            <h4>Related Documents</h4>
            <p>upload related documents to complete the process</p>
          </div>
          <div className="row mt-4 pb-5">
            <div className="col-md-4 mt-2">
              <UploadFiles
                // handleFileKey={handleFileKeyDoc1}
                fileDetails={file1}
                setFileDetails={setFile1}
              />
            </div>
            <div className="col-md-4 mt-2">
              <UploadFiles
                // handleFileKey={handleFileKeyDoc2}
                fileDetails={file2}
                setFileDetails={setFile2}
              />
            </div>
            <div className="col-md-4 mt-2">
              <UploadFiles
                // handleFileKey={handleFileKeyDoc3}
                fileDetails={file3}
                setFileDetails={setFile3}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="settings-btns col-md-6 col-sm-12">
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            &nbsp;&nbsp;
          </div>

          <div className="settings-btns col-md-6 col-sm-12 mt-md-0 mt-2">
            <div className="d-flex justify-content-md-end justify-content-center">
              <button
                type="submit"
                className="btn btn-secondary btn-main-secondary"
              >
                Cancel
              </button>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="border-0 btn-primary btn-main-primary text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {isLoading || documentLoading || (viewLoading && <FullscreenLoader />)}
      </form>
    </FormProvider>
  );
}

export default EditHospitalForm;
