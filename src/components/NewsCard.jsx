import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { localeOptions } from "../helpers/localesHelpers";
import iconBookmark from "../images/icon_bookmark.svg";
import iconBookmarkHover from "../images/icon_bookmark_hover.svg";
import iconBookmarkActive from "../images/icon_bookmark_active.svg";
import iconTrash from "../images/icon_trash.svg";

function NewsCard({
  keyword,
  title,
  description,
  publishedAt,
  source,
  url,
  urlToImage,
  lang,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPath = location.pathname === "/saved-news";

  const formattedPublishedAt = formatDate(publishedAt, lang);

  const [isHovered, setIsHovered] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [bookmarkImageInfo, setBookmarkImageInfo] = useState({
    src: iconBookmark,
    alt: "Imagem do ícone do botão salvar inativo",
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const saveArticle = () => {
    const articleToSave = {
      keyword,
      title,
      description,
      publishedAt,
      source,
      url,
      urlToImage,
      lang,
    };
    onSaveArticle(articleToSave);
    // Torna o bookmark ativo
    // Makes the bookmark active
    setIsBookmarkActive(true);
  };

  const findAndSetArticleIdToDelete = () => {
    const savedArticle = savedArticles.find((article) => article.url === url);
    if (savedArticle && savedArticle._id) {
      setArticleId(savedArticle._id);
    }
  };

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;

    if (!isSavedNewsPath) {
      if (!isBookmarkActive) {
        saveArticle();
      }
      // Se o artigo já estiver marcado, não faz nada
      // If the article is already bookmarked, does nothing
    } else if (isSavedNewsPath) {
      findAndSetArticleIdToDelete();
    }
  };

  function formatDate(publishedAt, lang) {
    const { locale, options } = localeOptions[lang] || localeOptions["en"];
    return new Date(publishedAt).toLocaleDateString(locale, options);
  }

  useEffect(() => {
    if (isSavedNewsPath && articleId) {
      onDeleteArticle(articleId);
      setIsBookmarkActive(false);
      // Reseta o articleId após o uso
      // Resets the articleId after use
      setArticleId(null);
    }
  }, [articleId]);

  useEffect(() => {
    if (isSavedNewsPath) {
      setBookmarkImageInfo({
        src: iconTrash,
        alt: "Imagem do ícone da lixeira",
      });
    } else if (isBookmarkActive) {
      setBookmarkImageInfo({
        src: iconBookmarkActive,
        alt: "Imagem do ícone do botão salvar ativo",
      });
    } else {
      setBookmarkImageInfo({
        src: isHovered ? iconBookmarkHover : iconBookmark,
        alt: isHovered
          ? "Imagem do ícone do botão salvar sobreposto"
          : "Imagem do ícone do botão salvar inativo",
      });
    }
  }, [isSavedNewsPath, isBookmarkActive, isHovered]);

  useEffect(() => {
    // Verifica se o artigo atual é uma array e se foi salvo usando a combinação de URL e title
    // Checks if the current article is an array and if it was saved using the combination of URL and title
    if (Array.isArray(savedArticles)) {
      const isArticleSaved = savedArticles.some(
        (article) => article.url === url && article.title === title
      );
      setIsBookmarkActive(isArticleSaved);
    } else {
      // Define como false se savedArticles não for um array
      // Sets to false if savedArticles is not an array
      setIsBookmarkActive(false);
    }
  }, [url, title, savedArticles]);

  return (
    <ul className="news-card">
      {isSavedNewsPath && currentUser && isLoggedIn && (
        <li>
          <p className="news-card__keyword">{keyword}</p>
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
          src={bookmarkImageInfo.src}
          alt={bookmarkImageInfo.alt}
        />
      </picture>
      {isHovered && (
        <>
          {!isSavedNewsPath && !isLoggedIn && !isBookmarkActive && (
            <p className="btn-tooltip-hover visible">
              {t("newCard.btnTooltipHoverLoggedOut")}
            </p>
          )}
          {!isSavedNewsPath && isLoggedIn && isBookmarkActive && (
            <p className="btn-tooltip-hover visible">
              {t("newCard.btnTooltipHoverLoggedIn")}
            </p>
          )}
          {isSavedNewsPath && isLoggedIn && (
            <p className="btn-tooltip-hover visible">
              {t("newCard.btnTooltipHoverDelete")}
            </p>
          )}
        </>
      )}
      <picture>
        <img
          src={urlToImage}
          className="news-card__url-to-img"
          alt={t("newCard.pictureNews")}
        />
      </picture>
      <li className="news-card__briefing">
        <p className="news-card__published-at">{formattedPublishedAt}</p>
        <h2 className="news-card__title">{title}</h2>
        <article className="news-card__description">{description}</article>
        <address className="news-card__source">{source}</address>
      </li>
    </ul>
  );
}

export default NewsCard;
