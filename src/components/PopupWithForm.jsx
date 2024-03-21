import useLang from "../hooks/useLang";
import useClosePopup from "../hooks/useClosePopupAndTooltip";
import iconClose from "../images/icon_close.svg";
import iconCloseSmall from "../images/icon_close_small.svg";

function PopupWithForm({
  children,
  title,
  isPopupOpen,
  isClosing,
  handleClosePopup,
}) {
  const { t } = useLang();
  useClosePopup(isPopupOpen, handleClosePopup, isClosing, "popup__opened");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClosePopup();
  };

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
