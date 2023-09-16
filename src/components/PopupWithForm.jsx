import React from "react";

import iconClose from "../images/icon_close.png";
import iconCloseSmall from "../images/icon_close_small.png";

function PopupWithForm({ setIsPopupOpen, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
  };

  return (
    <section className="popup" onSubmit={handleSubmit}>
      <form className="popup__form">
        <picture>
          <source media="(max-width: 584px)" srcSet={iconCloseSmall} />
          <img
            src={iconClose}
            alt="Imagem do ícone de fechamento da janela do popup"
            className="btn-popup-closed"
            onClick={() => setIsPopupOpen(false)}
          />
        </picture>
        <h1 className="popup__heading">Entrar</h1>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
