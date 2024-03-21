import { useState, useEffect } from "react";
import useLang from "./useLang";
import iconBookmark from "../images/icon_bookmark.svg";
import iconBookmarkHover from "../images/icon_bookmark_hover.svg";
import iconBookmarkActive from "../images/icon_bookmark_active.svg";
import iconTrash from "../images/icon_trash.svg";

function useBookmarkImage(isBookmarkActive, isHovered, isSavedNewsPath) {
  const { t } = useLang();

  const [bookmarkImageInfo, setBookmarkImageInfo] = useState({
    src: iconBookmark,
    alt: t("bookmark.altIconBookmarkInactive"),
  });

  useEffect(() => {
    if (isSavedNewsPath) {
      setBookmarkImageInfo({
        src: iconTrash,
        alt: t("bookmark.altIconTrash"),
      });
    } else if (isBookmarkActive) {
      setBookmarkImageInfo({
        src: iconBookmarkActive,
        alt: t("bookmark.altIconBookmarkActive"),
      });
    } else {
      setBookmarkImageInfo({
        src: isHovered ? iconBookmarkHover : iconBookmark,
        alt: isHovered
          ? t("bookmark.altIconBookmarkHover")
          : t("bookmark.altIconBookmarkInactive"),
      });
    }
  }, [isBookmarkActive, isHovered, isSavedNewsPath, t]);

  return bookmarkImageInfo;
}

export default useBookmarkImage;
