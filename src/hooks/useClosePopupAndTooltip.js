import { useEffect } from "react";

function useClosePopupAndTooltip(
  isOpen,
  closeFunction,
  isClosing,
  popupClassName
) {
  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isOpen && !isClosing) {
      closeFunction();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains(popupClassName) && !isClosing) {
      closeFunction();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isClosing, handleClickOutside]);

  return null;
}

export default useClosePopupAndTooltip;
