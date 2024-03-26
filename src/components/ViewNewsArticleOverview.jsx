import { useLocation } from "react-router-dom";
import useLang from "../hooks/useLang";
import useBookmarkHover from "../hooks/useBookmarkHover";
import useBookmarkImage from "../hooks/useBookmarkImage";
import { localeOptions, getStateLangForKey } from "../helpers/localesHelpers";
import formatDate from "../utils/formatDate";

function ViewNewsArticleOverview({
  isLoggedIn,
  handleBookmarkClick,
  isBookmarkActive,
  onImage,
}) {
  const location = useLocation();
  const { t } = useLang();
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

  const formattedPublishedAt = formatDate(publishedAt, lang, localeOptions);

  const openArticleUrl = () => {
    window.open(url, "_blank");
  };

  const handleImageClickOpen = () => {
    onImage({ urlToImage, title });
  };

  const { isHovered, handleMouseEnter, handleMouseLeave } = useBookmarkHover();

  const bookmarkImageInfo = useBookmarkImage(isBookmarkActive, isHovered);

  // Retrieves localized translation for the element, independent of the global language context.
  // Obtém tradução localizada para o elemento, independente do contexto global de idioma.
  const visitSourceLink = getStateLangForKey(
    "viewNewsArticleOverview.visitSourceLink",
    lang,
    "en"
  );

  return (
    <>
      <section className="view-news-article-overview">
        <div className="view-news-article-overview__url-to-img-container">
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
              loading="lazy"
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
            className="view-news-article-overview__url-to-img"
            onClick={handleImageClickOpen}
            src={urlToImage}
            alt={t("default.newsCardAltText", {
              title: title,
              description: description,
            })}
            loading="lazy"
          />
        </div>
        <div className="view-news-article-overview__briefing">
          <p className="view-news-article-overview__published-at">
            {formattedPublishedAt}
          </p>
          <h2 className="view-news-article-overview__title">{title}</h2>
          <article className="view-news-article-overview__description">
            {description}{" "}
            <span
              className="view-news-article-overview__visit-source-link"
              onClick={openArticleUrl}
            >
              {visitSourceLink}
              {source.toUpperCase()}.
            </span>
          </article>
          <address className="view-news-article-overview__source">
            {source}
          </address>
        </div>
      </section>
    </>
  );
}

export default ViewNewsArticleOverview;
