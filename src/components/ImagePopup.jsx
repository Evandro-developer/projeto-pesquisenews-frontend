import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import iconCloseSmall from "../images/icon_close_small.svg";
import iconClose from "../images/icon_close.svg";

function ImagePopup({
  selectedImage,
  onCloseImageClick,
  isClosing,
  setIsClosing,
}) {
  const { t } = useContext(LangContext);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && selectedImage && !isClosing) {
      startClosingAnimation();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("img-popup__opened") && !isClosing) {
      startClosingAnimation();
    }
  };

  const startClosingAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onCloseImageClick();
    }, 300);
  };

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedImage, isClosing]);

  if (!selectedImage && !isClosing) {
    return null;
  }

  return (
    <section
      className={`img-popup ${isClosing ? "img-popup" : "img-popup__opened"}`}
    >
      <div className="img-popup__container">
        <picture>
          <img
            type="url"
            src={selectedImage.urlToImage}
            alt={selectedImage.title}
            className="img-popup__image"
          />
        </picture>
        <div className="img-popup__title-container">
          <h2 className="img-popup__title">{selectedImage.title}</h2>
        </div>
        <picture>
          <source media="(max-width: 768px)" srcSet={iconCloseSmall} />
          <img
            src={iconClose}
            alt={t("default.closeIcon")}
            className="btn-popup-closed"
            onClick={startClosingAnimation}
          />
        </picture>
      </div>
    </section>
  );
}

export default ImagePopup;
