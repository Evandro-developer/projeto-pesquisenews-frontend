import { useNavigate } from "react-router-dom";
import useLang from "../hooks/useLang";
import useFilter from "../hooks/useFilter";
import useCurrentUser from "../hooks/useCurrentUser";
import useRouteChecker from "../hooks/useRouteChecker";
import useBookmarkHover from "../hooks/useBookmarkHover";
import useFindArticleById from "../hooks/useFindArticleById";
import useArticleSavedStatus from "../hooks/useArticleSavedStatus";
import useBookmarkImage from "../hooks/useBookmarkImage";
import useSaveArticleToAPI from "../hooks/useSaveArticleToAPI";
import useDeleteArticleFromAPI from "../hooks/useDeleteArticleFromAPI";
import { localeOptions } from "../helpers/localesHelpers";
import NAV_PATHS from "../utils/navPaths";
import formatDate from "../utils/formatDate";

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
  setSavedArticles,
  onClick,
  lastNewsCardRef,
}) {
  const navigate = useNavigate();
  const { t } = useLang();
  const { currentUser } = useCurrentUser();
  const { filteredSavedArticles, setFilteredSavedArticles } = useFilter();
  const { isSavedNewsRoute } = useRouteChecker();
  const { isHovered, handleMouseEnter, handleMouseLeave } = useBookmarkHover();
  const articleId = useFindArticleById(savedArticles, url);
  const { isBookmarkActive, setIsBookmarkActive } = useArticleSavedStatus(
    savedArticles,
    url,
    title
  );
  const bookmarkImageInfo = useBookmarkImage(
    isBookmarkActive,
    isHovered,
    isSavedNewsRoute
  );
  const saveArticleHookToAPI = useSaveArticleToAPI(
    setSavedArticles,
    currentUser
  );
  const deleteArticleHookFromAPI = useDeleteArticleFromAPI(
    savedArticles,
    setSavedArticles,
    filteredSavedArticles,
    setFilteredSavedArticles,
    currentUser
  );

  const navigateToViewNews = () => {
    navigate(NAV_PATHS.VIEW_NEWS, {
      state: {
        keyword,
        title,
        description,
        publishedAt,
        source,
        url,
        urlToImage,
        lang,
      },
    });
  };

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

  const handleBookmarkClick = async () => {
    if (!isLoggedIn) return;
    if (!isSavedNewsRoute && !isBookmarkActive) {
      saveArticleHookToAPI(articleToSave);
      setIsBookmarkActive(true);
    } else if (isSavedNewsRoute) {
      deleteArticleHookFromAPI(articleId);
    }
  };

  const formattedPublishedAt = formatDate(publishedAt, lang, localeOptions);

  return (
    <ul className="news-card" onClick={onClick} ref={lastNewsCardRef || null}>
      {isSavedNewsRoute && currentUser && isLoggedIn && (
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
          loading="lazy"
        />
      </picture>
      {isHovered && (
        <>
          {!isSavedNewsRoute && !isLoggedIn && !isBookmarkActive && (
            <p className="btn-tooltip-hover visible">
              {t("bookmark.btnTooltipHoverLoggedOut")}
            </p>
          )}
          {!isSavedNewsRoute && isLoggedIn && isBookmarkActive && (
            <p className="btn-tooltip-hover visible">
              {t("bookmark.btnTooltipHoverLoggedIn")}
            </p>
          )}
          {isSavedNewsRoute && isLoggedIn && (
            <p className="btn-tooltip-hover visible">
              {t("bookmark.btnTooltipHoverDelete")}
            </p>
          )}
        </>
      )}
      <picture>
        <img
          src={urlToImage}
          className="news-card__url-to-img"
          onClick={() => navigateToViewNews()}
          alt={t("default.newsCardAltText", {
            title: title,
            description: description,
          })}
          loading="lazy"
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
