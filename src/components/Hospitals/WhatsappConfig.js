import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../Inputfields/InputField";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function WhatsappConfig({ hospitalId }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const methods = useForm({
    defaultValues: {
      whatsappPhoneNumberId: "",
      whatsappBusinessAccountId: "",
      whatsappAccessToken: "",
    },
  });

  const { handleSubmit, reset } = methods;

  // ✅ Fetch existing config when component mounts
  useEffect(() => {
    if (!hospitalId) return;

    const fetchConfig = async () => {
      try {
        const res = await fetch(
          `https://staging.zodoai.com/api/hospitals/${hospitalId}`
        );
        const data = await res.json();

        if (data?.whatsapp_config) {
          const config = data.whatsapp_config;
          reset({
            whatsappPhoneNumberId: config.phone_number_id || "",
            whatsappBusinessAccountId: config.business_account_id || "",
            whatsappAccessToken: config.access_token || "",
          });
          setIsEnabled(config.is_enabled ?? true); //default true
          setWebhookUrl(config.webhook_url || "");
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, [hospitalId, reset]);

  // ✅ Copy webhook URL
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(webhookUrl);
    toast.success("Webhook URL copied to clipboard!");
    setShowPopup(false); // ✅ Close after successful copy
  } catch (error) {
    console.error("Failed to copy:", error);
    toast.error("Failed to copy webhook URL!");
  }
};



  // ✅ Submit WhatsApp Config
const onSubmit = async (data) => {
    if (!hospitalId) {
      toast.error("Missing hospital ID!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://staging.zodoai.com/api/hospitals/${hospitalId}/whatsapp/setup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            is_enabled: isEnabled,
            webhook_url: "https://staging.zodoai.com",
            access_token: data.whatsappAccessToken,
            webhook_secret: "V3rIFFySeCCureTkkN5326sdfa",
            phone_number_id: data.whatsappPhoneNumberId,
            business_account_id: data.whatsappBusinessAccountId,
          }),
        }
      );

      const res = await response.json();

      if (response.ok) {
        setWebhookUrl(res.webhook_url);
        setShowPopup(true);
        toast.success("Whatsapp configuration saved successfully")
      } else {
        toast.error(res.message || "Failed to save WhatsApp configuration.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    } finally {
      setIsLoading(false);
    }
  };


const handleToggleChange = async () => {
  const newState = !isEnabled;
  setIsEnabled(newState);

  try {
    // Immediately update backend with new is_enabled state
    const response = await fetch(
      `https://staging.zodoai.com/api/hospitals/${hospitalId}/whatsapp/setup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_enabled: newState,
          webhook_url: "https://staging.zodoai.com",
          access_token: methods.getValues("whatsappAccessToken") || "",
          webhook_secret: "V3rIFFySeCCureTkkN5326sdfa",
          phone_number_id: methods.getValues("whatsappPhoneNumberId") || "",
          business_account_id: methods.getValues("whatsappBusinessAccountId") || "",
        }),
      }
    );

    const res = await response.json();

    if (response.ok) {
      toast.success(
        newState
          ? "WhatsApp configuration enabled!"
          : "WhatsApp configuration disabled!"
      );
    } else {
      toast.error(res.message || "Failed to update toggle state.");
    }
  } catch (error) {
    console.error("Error updating toggle:", error);
    toast.error("Error connecting to backend.");
  }
};


  useEffect(() => {
      const preventEnterSubmit = (e) => {
        if (e.key === "Enter") e.preventDefault();
      };
      window.addEventListener("keydown", preventEnterSubmit);
      return () => window.removeEventListener("keydown", preventEnterSubmit);
    }, []);
    
  return (
    <FormProvider {...methods}>
      <div className="card shadow-sm p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">WhatsApp Business Configuration</h4>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="whatsappToggle"
              checked={isEnabled}
              onChange={handleToggleChange}
            />
            <label className="form-check-label" htmlFor="whatsappToggle">
              {isEnabled ? "Enabled" : "Disabled"}
            </label>
          </div>
        </div>

        {isEnabled && (
          <div>
            <div className="row">
              <div className="col-md-4 d-flex flex-column gap-3">
                <InputField
                  type="text"
                  name="whatsappPhoneNumberId"
                  label="Phone Number ID"
                  placeholder="Enter Phone Number ID"
                  validation={{ required: "Phone Number ID is required" }}
                />

                <InputField
                  type="text"
                  name="whatsappBusinessAccountId"
                  label="Business Account ID"
                  placeholder="Enter Business Account ID"
                  validation={{ required: "Business Account ID is required" }}
                />
              </div>


              <div className="col-md-8 mt-3 mt-md-0">
                <InputField
                  type="password"
                  name="whatsappAccessToken"
                  label="Access Token"
                  placeholder="Enter Access Token"
                  validation={{ required: "Access Token is required" }}
                />
              </div>
            </div>

            {/* ✅ Button - No form refresh now */}
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button" // Important: prevents form submit refresh
                className="border-0 btn-primary btn-main-primary text-white px-4 py-2 rounded"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)} // Manual trigger
              >
                {isLoading ? "Saving..." : "Save Configuration"}
                
              </button>
            </div>
          </div>
        )}

        {/* ✅ Overlay Popup */}
        {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            className="bg-white rounded-4 shadow-lg text-center p-4 position-relative"
            style={{
              width: "90%",
              maxWidth: "420px",
              animation: "slideUp 0.3s ease-in-out",
            }}
          >
            {/* ✅ Close button at top-right */}
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            ></button>

            {/* ✅ Icon and title */}
            <div
              className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#e8f5e9",
                color: "#347D73",
                fontSize: "28px",
              }}
            >
              ✅
            </div>

            <h5 className="fw-semibold mb-2">Webhook URL Created</h5>
            <p className="text-muted mb-3 small">
              Your webhook URL has been successfully generated.
            </p>

            <div
              className="border rounded px-3 py-2 mb-3 bg-light text-break"
              style={{
                fontSize: "0.9rem",
                wordBreak: "break-word",
              }}
            >
              {webhookUrl}
            </div>

            <div className="d-flex justify-content-center gap-2">
             <button
                type="button"
                className="btn text-white px-3"
                style={{
                  backgroundColor: "#347D73",
                  borderColor: "#347D73",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c6b63")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#347D73")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopy();
                }}
              >
                 Copy URL
            </button>

              <button
                className="btn btn-outline-secondary px-3"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
  )}
      </div>
    </FormProvider>
  );
}

WhatsappConfig.propTypes = {
  hospitalId: PropTypes.string.isRequired,
};

export default WhatsappConfig;
