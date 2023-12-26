import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import { localeOptions, getStateLangForKey } from "../helpers/localesHelpers";
import CurrentUserContext from "../contexts/CurrentUserContext";
import formatDate from "../utils/formatDate";
import useBookmarkHover from "../hooks/useBookmarkHover";
import useArticleSavedStatus from "../hooks/useArticleSavedStatus";
import useBookmarkImage from "../hooks/useBookmarkImage";
import useSaveArticleToAPI from "../hooks/useSaveArticleToAPI";

function ViewNewsHeader({
  onImageClick,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
}) {
  const location = useLocation();
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);

  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    lang,
  } = location.state;

  const articleToSave = location.state;
  const formattedPublishedAt = formatDate(publishedAt, lang, localeOptions);

  const { isHovered, handleMouseEnter, handleMouseLeave } = useBookmarkHover();
  const { isBookmarkActive, setIsBookmarkActive } = useArticleSavedStatus(
    savedArticles,
    url,
    title
  );
  const bookmarkImageInfo = useBookmarkImage(isBookmarkActive, isHovered);
  const saveArticleHookToAPI = useSaveArticleToAPI(
    savedArticles,
    setSavedArticles,
    currentUser
  );

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;
    if (!isBookmarkActive) {
      saveArticleHookToAPI(articleToSave);
      setIsBookmarkActive(true);
    }
  };

  const openArticleUrl = () => {
    window.open(url, "_blank");
  };

  const handleImageClickOpen = () => {
    onImageClick({ urlToImage, title });
  };

  // Obtém tradução localizada para o elemento, independente do contexto global de idioma.
  // Retrieves localized translation for the element, independent of the global language context.
  const visitSourceLink = getStateLangForKey(
    "viewNewsHeader.visitSourceLink",
    lang,
    "en"
  );

  return (
    <section className="view-news-header">
      <div className="view-news-header__container">
        <div className="view-news-header__url-to-img-container">
          <p className="news-card__keyword">{keyword}</p>
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
              {!isLoggedIn && !isBookmarkActive && (
                <p className="btn-tooltip-hover visible">
                  {t("bookmark.btnTooltipHoverLoggedOut")}
                </p>
              )}
              {isLoggedIn && isBookmarkActive && (
                <p className="btn-tooltip-hover visible">
                  {t("bookmark.btnTooltipHoverLoggedIn")}
                </p>
              )}
            </>
          )}
          <img
            className="view-news-header__url-to-img"
            onClick={handleImageClickOpen}
            src={urlToImage}
            alt={t("default.newsCardAltText", {
              title: title,
              description: description,
            })}
          />
        </div>
        <div className="view-news-header__briefing">
          <p className="view-news-header__published-at">
            {formattedPublishedAt}
          </p>
          <h2 className="view-news-header__title" onClick={openArticleUrl}>
            {title}
          </h2>
          <article className="view-news-header__description">
            {description}{" "}
            <span
              className="view-news-header__visit-source-link"
              onClick={openArticleUrl}
            >
              {visitSourceLink}
              {source.toUpperCase()}.
            </span>
          </article>
          <address className="view-news-header__source">{source}</address>
        </div>
      </div>
    </section>
  );
}

export default ViewNewsHeader;
