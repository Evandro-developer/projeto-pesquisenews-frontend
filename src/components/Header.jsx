import useLang from "../hooks/useLang";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import bgimage_large from "../images/bgimage_large.png";
import bgimage_medium from "../images/bgimage_medium.png";
import bgimage_small from "../images/bgimage_small.png";

function Header({
  isLoggedIn,
  setIsLoggedIn,
  isPopupOpen,
  setIsPopupOpen,
  onSignOut,
  onSearch,
  searchLang,
  setSearchLang,
  setSearchScrollY,
}) {
  const { t } = useLang();

  return (
    <header className="header">
      <div className="header__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          onSignOut={onSignOut}
        />
        <SearchForm
          onSearch={onSearch}
          searchLang={searchLang}
          setSearchLang={setSearchLang}
          setSearchScrollY={setSearchScrollY}
        />
        <picture className="header__container-img">
          <source media="(max-width: 384px)" srcSet={bgimage_small} />
          <source media="(max-width: 968px)" srcSet={bgimage_medium} />
          <img
            srcSet={bgimage_large}
            alt={t("header.pictureAlt")}
            className="header__img"
          />
        </picture>
      </div>
    </header>
  );
}

export default Header;
