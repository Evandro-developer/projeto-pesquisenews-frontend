import React from "react";
import imgSpinner from "../images/img_spinner.svg";
import imgErrorNews from "../images/img_error_news.png";

function Preload({ isError }) {
  if (isError) {
    return (
      <section className="preload">
        <div className="preload__content-error">
          <picture>
            <img
              className="preload__error-img"
              src={imgErrorNews}
              alt="Imagem de erro ao carregar as notícias"
            />
          </picture>
          <h2 className="preload__heading-error">Nada encontrado</h2>
          <p className="preload__text-error">
            Desculpe, mas nada corresponde aos seus termos de pesquisa.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="preload">
      <div className="preload__content-spinner">
        <picture>
          <img
            className="preload__spinner-img"
            src={imgSpinner}
            alt="Imagem giratória antes de carregar as notícias"
          />
        </picture>
        <h3 className="preload__heading-spinner">Procurando notícias...</h3>
      </div>
    </section>
  );
}

export default Preload;
