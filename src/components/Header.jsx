import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
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
  onLogout,
  handleSignOut,
  onSearch,
}) {
  const { t } = useContext(LangContext);

  return (
    <header className="header">
      <div className="header__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          onLogout={onLogout}
          handleSignOut={handleSignOut}
        />
        <SearchForm onSearch={onSearch} />
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
