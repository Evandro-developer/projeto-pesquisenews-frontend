import React from "react";

function SavedNewsHeader({ query, userName }) {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__saved-articles">Artigos salvos</p>
        <h2 className="saved-news-header__heading">
          {userName}, você tem 5 artigos salvos
        </h2>
        <p className="saved-news-header__query">Por palavras-chave: {query}</p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
