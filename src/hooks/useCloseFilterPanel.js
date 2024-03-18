import { useEffect } from "react";

function useCloseFilterPanel(isOpen, closeFunction) {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeFunction();
      }
    };

    const handleClickOutside = (e) => {
      const panelElement = document.querySelector(".filter-panel-display");
      if (panelElement && !panelElement.contains(e.target) && isOpen) {
        closeFunction();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeFunction]);

  return null;
}

export default useCloseFilterPanel;
