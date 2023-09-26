import React, { useEffect } from "react";
import closedBtn from "../images/icon_close.png";
import closedBtnSmall from "../images/icon_close_small.png";

function InfoToolTip({
  isToolTipOpen,
  setIsPopupOpen,
  isClosing,
  setIsClosing,
  isMounted,
  setIsMounted,
  registerSuccess,
  handleCloseInfoToolTip,
}) {
  const handleLoginFromTooltip = () => {
    handleCloseInfoToolTip();
    setIsPopupOpen(true);
  };
  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isToolTipOpen) {
      handleCloseInfoToolTip();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("infoToolTip__opened")) {
      handleCloseInfoToolTip();
    }
  };

  useEffect(() => {
    if (isToolTipOpen) {
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
  }, [isToolTipOpen, isMounted]);

  return (
    <section
      className={`infoToolTip ${isToolTipOpen ? "infoToolTip__opened" : ""} ${
        isClosing ? "infoToolTip__closed" : ""
      }`}
    >
      <div className="infoToolTip__container">
        <h2 className="infoToolTip__heading">
          {registerSuccess === "success"
            ? "Cadastro concluído com sucesso!"
            : registerSuccess}
        </h2>
        <span
          role="button"
          className="infoToolTip__signin-text"
          onClick={handleLoginFromTooltip}
        >
          Entrar
        </span>

        <picture>
          <source media="(max-width: 584px)" srcSet={closedBtnSmall} />
          <img
            aria-label="Close button"
            onClick={handleCloseInfoToolTip}
            className="btn-info-tooltip-closed"
            src={closedBtn}
            alt="Imagem do ícone de fechamento da janela infotooltip"
          />
        </picture>
      </div>
    </section>
  );
}

export default InfoToolTip;