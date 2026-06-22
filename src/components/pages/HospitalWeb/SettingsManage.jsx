import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import { FormProvider, useForm, Controller } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useAuth } from "../../../hooks/useAuth";
import { useSettings } from "../../../hooks/hospitalWeb/useSettings";
import { useAddSettings } from "../../../hooks/hospitalWeb/useAddSettings";
import { useEditSettings } from "../../../hooks/hospitalWeb/useEditSettings";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ChooseFile from "../../Hospitals/ChooseFile";

function SettingsManage() {
  const { hospitalId } = useAuth();
  const { data: settingsData, isLoading: isLoadingSettings } = useSettings(hospitalId);
  const { data: departmentListData, isLoading: isLoadingDeps } = useDepartmentList(hospitalId);

  const { mutate: addMutate, isLoading: isAdding } = useAddSettings();
  const { mutate: editMutate, isLoading: isEditing } = useEditSettings();

  const [status, setStatus] = useState(true);
  const [logoFileURL, setLogoFileURL] = useState("");
  const [aboutUsFileURL, setAboutUsFileURL] = useState("");
  const methods = useForm();
  const { control, handleSubmit, setValue } = methods;

  useEffect(() => {
    if (settingsData) {
      setValue("description", settingsData.description || "");
      setValue("about_us", settingsData.about_us || "");
      setValue("primary_color", settingsData.primary_color || "#000000");
      setValue("secondary_color", settingsData.secondary_color || "#000000");
      setLogoFileURL(settingsData.logo_image || "");
      setAboutUsFileURL(settingsData.about_us_image || "");
      setValue("director_name", settingsData.director_name || "");
      setValue("director_title", settingsData.director_title || "");
      setValue("director_message", settingsData.director_message || "");
      setValue("contact_email", settingsData.contact_email || "");
      setValue("contact_phone", settingsData.contact_phone || "");
      setValue("contact_address", settingsData.contact_address || "");

      setValue("facebook", settingsData.social_links?.facebook || "");
      setValue("instagram", settingsData.social_links?.instagram || "");
      setValue("twitter", settingsData.social_links?.twitter || "");
      setValue("linkedin", settingsData.social_links?.linkedin || "");
      setValue("youtube", settingsData.social_links?.youtube || "");

      if (settingsData.available_departments && departmentListData) {
        const selectedDeps = departmentListData
          .filter(dep => settingsData.available_departments.includes(dep.id))
          .map(dep => ({ value: dep.id, label: dep.name }));
        setValue("available_departments", selectedDeps);
      }

      setStatus(settingsData.is_active !== undefined ? settingsData.is_active : true);
    }
  }, [settingsData, departmentListData, setValue]);

  const departmentOptions = departmentListData?.map(dep => ({
    value: dep.id,
    label: dep.name
  })) || [];

  const onSubmit = async (data) => {
    const payload = {
      hospital_id: hospitalId,
      description: data.description || "",
      about_us: data.about_us || "",
      primary_color: data.primary_color || "",
      secondary_color: data.secondary_color || "",
      logo_image: logoFileURL,
      about_us_image: aboutUsFileURL,
      director_name: data.director_name || "",
      director_title: data.director_title || "",
      director_message: data.director_message || "",
      contact_email: data.contact_email || "",
      contact_phone: data.contact_phone || "",
      contact_address: data.contact_address || "",
      available_departments: data.available_departments ? data.available_departments.map(d => d.value) : [],
      social_links: {
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        youtube: data.youtube || ""
      },
      is_active: status,
    };

    if (settingsData && settingsData.hospital_id) {
      await editMutate({ id: settingsData.hospital_id, data: payload });
    } else {
      await addMutate(payload);
    }
  };

  const breadCrumpData = [
    { name: "Hospital Web", status: "active", link: "#" },
    { name: "Settings", status: "active", link: "/hospital-web/settings" },
  ];

  return (
    <Layout activeClassName="hw-setting" id="menu-item-hw" id1="menu-items-hw">
      <div className="page-wrapper pb-3">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Web Settings" />

          <div className="card mt-4">
            <div className="card-body">
              {isLoadingSettings || isLoadingDeps ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-4">
                      <div className="col-md-8">
                        <h5 className="card-title mb-0">General Settings</h5>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end">
                        <select
                          className="form-select form-select-sm w-auto"
                          value={status}
                          onChange={(e) => setStatus(e.target.value === "true")}
                        >
                          <option value={true}>Active</option>
                          <option value={false}>In Active</option>
                        </select>
                      </div>
                    </div>

                    <h5 className="card-title mt-2 mb-3 fw-bold">Theme & Media</h5>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Logo Image</label>
                        <ChooseFile handleFileURL={setLogoFileURL} fileURL={logoFileURL} />
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label className="form-label">Primary Color</label>
                          <Controller
                            name="primary_color"
                            control={control}
                            defaultValue="#000000"
                            render={({ field }) => (
                              <div className="d-flex align-items-center gap-2">
                                <input
                                  type="color"
                                  className="form-control form-control-color"
                                  title="Choose your color"
                                  value={field.value}
                                  onChange={field.onChange}
                                  style={{ width: '50px', padding: '0.375rem' }}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="#000000"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label className="form-label">Secondary Color</label>
                          <Controller
                            name="secondary_color"
                            control={control}
                            defaultValue="#000000"
                            render={({ field }) => (
                              <div className="d-flex align-items-center gap-2">
                                <input
                                  type="color"
                                  className="form-control form-control-color"
                                  title="Choose your color"
                                  value={field.value}
                                  onChange={field.onChange}
                                  style={{ width: '50px', padding: '0.375rem' }}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="#000000"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div> */}
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">About Us</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label className="form-label">About Us Text</label>
                          <Controller
                            name="about_us"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <CKEditor
                                editor={ClassicEditor}
                                data={field.value || ""}
                                config={{
                                  toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "|",
                                    "bulletedList",
                                    "numberedList",
                                    "|",
                                    "alignment",
                                    "|",
                                    "undo",
                                    "redo",
                                  ],
                                }}
                                onChange={(event, editor) => {
                                  field.onChange(editor.getData());
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">About Us Image</label>
                        <ChooseFile handleFileURL={setAboutUsFileURL} fileURL={aboutUsFileURL} />
                      </div>
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">Director Message</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <InputField
                            name="director_name"
                            label="Director Name"
                            placeholder="Enter director name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <InputField
                            name="director_title"
                            label="Director Title"
                            placeholder="Enter director title"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label className="form-label">Director Message</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Enter director message"
                            {...methods.register("director_message")}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">Contact Details</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField
                            name="contact_email"
                            label="Email Address"
                            placeholder="user@example.com"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField
                            name="contact_phone"
                            label="Phone Number"
                            placeholder="Enter phone number"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <InputField
                            name="contact_address"
                            label="Address"
                            placeholder="Enter full address"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">Departments</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label className="form-label">Available Departments</label>
                          <Controller
                            name="available_departments"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isMulti
                                options={departmentOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select departments..."
                                components={{ MultiValue: () => null }}
                                hideSelectedOptions={false}
                                controlShouldRenderValue={false}
                              />
                            )}
                          />
                          <div className="mt-2 d-flex flex-wrap gap-2">
                            {(methods.watch("available_departments") || []).map((dep) => (
                              <span key={dep.value} className="badge bg-primary d-flex align-items-center p-2 fs-6">
                                {dep.label}
                                <i
                                  className="fas fa-times ms-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    const currentDeps = methods.watch("available_departments") || [];
                                    const newDeps = currentDeps.filter(d => d.value !== dep.value);
                                    setValue("available_departments", newDeps, { shouldValidate: true, shouldDirty: true });
                                  }}
                                ></i>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">Social Links</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField name="facebook" label="Facebook URL" placeholder="https://facebook.com/..." type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField name="instagram" label="Instagram URL" placeholder="https://instagram.com/..." type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField name="twitter" label="Twitter URL" placeholder="https://twitter.com/..." type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField name="linkedin" label="LinkedIn URL" placeholder="https://linkedin.com/..." type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <InputField name="youtube" label="YouTube URL" placeholder="https://youtube.com/..." type="text" />
                        </div>
                      </div>
                    </div>

                    <h5 className="card-title mt-4 mb-3 fw-bold">Additional Information</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <InputField
                            name="description"
                            label="Footer Description"
                            placeholder="Enter description"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                      <Button variant="primary" className="ps-5 pe-5 py-2" type="submit" disabled={isAdding || isEditing}>
                        {(isAdding || isEditing) && (
                          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        )}
                        <span>Save Settings</span>
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default SettingsManage;
