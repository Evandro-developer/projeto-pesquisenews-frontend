import { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import iconClose from "../images/icon_close.svg";
import iconCloseSmall from "../images/icon_close_small.svg";

function PopupWithForm({
  children,
  title,
  isPopupOpen,
  isClosing,
  setIsClosing,
  isMounted,
  setIsMounted,
  handleClosePopup,
}) {
  const { t } = useContext(LangContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClosePopup();
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isPopupOpen) {
      handleClosePopup();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup__opened")) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      setIsMounted(true);
      setIsClosing(false);
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    } else {
      setIsClosing(true);
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupOpen, isMounted]);

  return (
    <section
      className={`popup ${isPopupOpen ? "popup__opened" : ""} ${
        isClosing ? "popup__closed" : ""
      }`}
    >
      <form
        className="popup__form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <picture>
          <source media="(max-width: 584px)" srcSet={iconCloseSmall} />
          <img
            src={iconClose}
            alt={t("default.closeIcon")}
            className="btn-popup-closed"
            onClick={handleClosePopup}
          />
        </picture>
        <h1 className="popup__heading">{title}</h1>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
