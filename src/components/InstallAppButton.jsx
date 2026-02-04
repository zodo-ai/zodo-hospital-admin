import { useEffect, useState } from "react";

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    // Detect already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (isInstalled) return null;

  const handleInstall = () => {
    // Chrome / Edge / Android
    if (deferredPrompt) {
      deferredPrompt.prompt();
      return;
    }

    // iOS Safari
    if (isIOS) {
      alert("Tap Share → Add to Home Screen to install this app.");
      return;
    }

    // Firefox & others
    alert("Open browser menu → Install App / Add to Home Screen");
  };

  return (
    <button
      onClick={handleInstall}
      style={{
        padding: "10px 14px",
        background: "#347D73",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop:"15px",
      }}
    >
      Install App
    </button>
  );
};

export default InstallAppButton;
