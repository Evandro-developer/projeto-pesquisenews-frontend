import React, { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useClosePopup from "../hooks/useClosePopupAndTooltip";
import iconCloseSmall from "../images/icon_close_small.svg";
import iconClose from "../images/icon_close.svg";

function ImagePopup({
  selectedImage,
  onCloseImageClick,
  isClosing,
  setIsClosing,
}) {
  const { t } = useContext(LangContext);

  const startClosingAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onCloseImageClick();
    }, 200);
  };

  useClosePopup(
    selectedImage,
    startClosingAnimation,
    isClosing,
    "img-popup__opened"
  );

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
