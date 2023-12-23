import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import { localeOptions } from "../helpers/localesHelpers";
import CurrentUserContext from "../contexts/CurrentUserContext";
import formatDate from "../utils/formatDate";
import useBookmarkHover from "../hooks/useBookmarkHover";
import useFindArticleById from "../hooks/UseFindArticleById";
import useArticleSavedStatus from "../hooks/useArticleSavedStatus";
import useBookmarkImage from "../hooks/useBookmarkImage";
import useSaveArticleToAPI from "../hooks/useSaveArticleToAPI";
import useDeleteArticleFromAPI from "../hooks/useDeleteArticleFromAPI";

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
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);

  const formattedPublishedAt = formatDate(publishedAt, lang, localeOptions);
  const isSavedNewsPath = location.pathname === "/saved-news";

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
    isSavedNewsPath
  );
  const saveArticleHookToAPI = useSaveArticleToAPI(
    savedArticles,
    setSavedArticles,
    currentUser
  );
  const deleteArticleHookFromAPI = useDeleteArticleFromAPI(
    savedArticles,
    setSavedArticles,
    currentUser
  );

  const navigateToViewNews = () => {
    navigate("/view-news", {
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

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;
    if (!isSavedNewsPath && !isBookmarkActive) {
      saveArticleHookToAPI(articleToSave);
      setIsBookmarkActive(true);
    } else if (isSavedNewsPath) {
      deleteArticleHookFromAPI(articleId);
    }
  };

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
              {t("bookmark.btnTooltipHoverLoggedOut")}
            </p>
          )}
          {!isSavedNewsPath && isLoggedIn && isBookmarkActive && (
            <p className="btn-tooltip-hover visible">
              {t("bookmark.btnTooltipHoverLoggedIn")}
            </p>
          )}
          {isSavedNewsPath && isLoggedIn && (
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
          alt={`${t("default.newsAbout")} ${title}: ${t(
            "default.imageShowing"
          )} ${description}`}
        />
      </picture>
      <li className="news-card__briefing">
        <p className="news-card__published-at">{formattedPublishedAt}</p>
        <h2 className="news-card__title" onClick={() => navigateToViewNews()}>
          {title}
        </h2>
        <article className="news-card__description">{description}</article>
        <address className="news-card__source">{source}</address>
      </li>
    </ul>
  );
}

export default NewsCard;
