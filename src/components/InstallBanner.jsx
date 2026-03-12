import { useEffect, useState } from "react";
import { mainLogo } from "./imagepath";

const InstallBanner = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("installBannerDismissed");
    if (dismissed) return;
    setShow(true);// 👈 DEV MODE: force show banner

    const ua = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));
    setIsFirefox(ua.includes("firefox"));

    // Chrome / Edge
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // After install hide banner
    const installedHandler = () => setShow(false);
    window.addEventListener("appinstalled", installedHandler);


    // Firefox & iOS fallback banner
    if (isIOS || isFirefox) {
      setTimeout(() => setShow(true), 2000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };

  }, []);

  if (!show) return null;

  const handleAdd = () => {
    if (promptEvent) {
      promptEvent.prompt();
      setShow(false);
      return;
    }

    if (isIOS) {
      alert("Tap Share → Add to Home Screen");
      return;
    }

    if (isFirefox) {
      alert("Open browser menu → Install App");
      return;
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{
            borderRadius: "20px",
            maxWidth: "380px",      // 👈 reduce width
            margin: "auto",
          }}
        >

          {/* Header */}
          <div
            className="modal-header"
            style={{
              borderBottom: "none",
              justifyContent: "center",
            }}
          >
            <img src={mainLogo} height="32" alt="Zodo" />
          </div>

          {/* Body */}
          <div
            className="modal-body text-center"
            style={{
              borderBottom: "none",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Add Zodo App to Home Screen?
          </div>

          {/* Footer */}
          <div
            className="modal-footer"
            style={{
              borderTop: "none",
              display: "flex",
              justifyContent: "center",
              gap: "14px", // 👈 space between buttons
            }}
          >
            <button
              className="btn btn-secondary"
              style={{ borderRadius: "25px", padding: "8px 26px" }}
              onClick={() => {
                localStorage.setItem("installBannerDismissed", "true");
                setShow(false);
              }}
            >
              Cancel
            </button>

            <button
              className="btn btn-success"
              style={{ borderRadius: "25px", padding: "8px 26px" }}
              onClick={handleAdd}
            >
              Add
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstallBanner;
