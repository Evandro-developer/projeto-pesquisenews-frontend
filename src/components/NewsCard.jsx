import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import iconBookmark from "../images/icon_bookmark.png";
import iconBookmarkHover from "../images/icon_bookmark_hover.png";
import iconBookmarkActive from "../images/icon_bookmark_active.png";
import iconTrash from "../images/icon_trash.png";

function NewsCard({
  source,
  title,
  publishedAt,
  description,
  urlToImage,
  isLoggedIn,
  query,
}) {
  const location = useLocation();
  const isSavedNewsPath = location.pathname === "/saved-news";
  const formattedPublishedAt = formatDate(publishedAt);

  const [isBookmarkActive, setIsBookmarkActive] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBookmarkClick = () => {
    setIsBookmarkActive((prevState) => !prevState);
  };

  const getBookmarkImageInfo = () => {
    if (isSavedNewsPath) {
      return {
        src: iconTrash,
        alt: "Imagem do ícone da lixeira",
      };
    } else if (isBookmarkActive) {
      return {
        src: iconBookmarkActive,
        alt: "Imagem do ícone do botão salvar ativo",
      };
    } else {
      return {
        src: isHovered ? iconBookmarkHover : iconBookmark,
        alt: isHovered
          ? "Imagem do ícone do botão salvar sobreposto"
          : "Imagem do ícone do botão salvar inativo",
      };
    }
  };

  const { src: bookmarkImageSrc, alt: bookmarkImageAlt } =
    getBookmarkImageInfo();

  function formatDate(publishedAt) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(publishedAt).toLocaleDateString(
      "pt-BR",
      options
    );
    return formattedDate;
  }

  return (
    <ul className="news-card">
      {isSavedNewsPath && (
        <li>
          <p className="news-card__category">{query}</p>
        </li>
      )}
      <picture
        className="btn-default"
        onClick={handleBookmarkClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className={`btn-default__container ${
            isBookmarkActive ? "active" : ""
          }`}
          src={bookmarkImageSrc}
          alt={bookmarkImageAlt}
        />
      </picture>
      {isHovered && (
        <>
          {!isSavedNewsPath && isLoggedIn && !isBookmarkActive && (
            <p className="btn-tooltip-hover">Faça Login para salvar artigos</p>
          )}
          {isSavedNewsPath && !isLoggedIn && (
            <p className="btn-tooltip-hover">Remover dos salvos</p>
          )}
        </>
      )}
      <picture>
        <img src={urlToImage} className="news-card__img" alt="News" />
      </picture>
      <li className="news-card__briefing">
        <p className="news-card__published-at">{formattedPublishedAt}</p>
        <h2 className="news-card__heading">{title}</h2>
        <article className="news-card__article">{description}</article>
        <address className="news-card__author">{source.name}</address>
      </li>
    </ul>
  );
}

export default NewsCard;
