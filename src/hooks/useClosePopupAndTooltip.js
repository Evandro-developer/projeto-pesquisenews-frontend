import { useEffect, useCallback } from "react";

function useClosePopupAndTooltip(
  isOpen,
  closeFunction,
  isClosing,
  popupClassName
) {
  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen && !isClosing) {
        closeFunction();
      }
    },
    [isOpen, isClosing, closeFunction]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (e.target.classList.contains(popupClassName) && !isClosing) {
        closeFunction();
      }
    },
    [popupClassName, isClosing, closeFunction]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isClosing, handleEscapeKey, handleClickOutside]);

  return null;
}

export default useClosePopupAndTooltip;
