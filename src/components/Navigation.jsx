import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import { languages } from "../helpers/localesHelpers";
import CurrentUserContext from "../contexts/CurrentUserContext";
import vectorWhiteImg from "../images/vector_white.svg";
import vectorDarkImg from "../images/vector_dark.svg";
import getNavThemeClasses from "../helpers/getNavThemeClasses";

function Navigation({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  handleSignOut,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const { t, lang, setLang } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);

  const [buttonLabel, setButtonLabel] = useState("Entrar");
  const [popupType, setPopupType] = useState("login");
  const [navigatePath, setNavigatePath] = useState("/");
  const [theme, setTheme] = useState(
    location.pathname !== "/" ? "dark" : "light"
  );

  const themeClasses = getNavThemeClasses(theme);

  const handleLangChange = (evt) => {
    setLang(evt.target.value);
  };

  const handleButtonClick = (evt) => {
    evt.preventDefault();

    if (popupType === "PopupRegister" || popupType === "PopupLogin") {
      setIsPopupOpen(true);
      return;
    }

    navigate(navigatePath);
  };

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/signin" ||
      location.pathname === "/signup"
    ) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setButtonLabel(t("nav.signUp"));
      setPopupType("PopupRegister");
      setNavigatePath("/signin");
      setIsLoggedIn(false);
    } else if (location.pathname === "/signin") {
      setButtonLabel(t("nav.signIn"));
      setPopupType("PopupLogin");
      setNavigatePath("/");
      setIsLoggedIn(false);
    }
  }, [location.pathname, t]);

  return (
    <section className="navigation">
      <nav className="navigation__container">
        <div className="navigation__branding">
          <h1 className={`navigation__title ${themeClasses.titleClass}`}>
            <Link to="/" className="navigation__link">
              {t("nav.title")}
            </Link>
          </h1>

          <select
            value={lang}
            onChange={handleLangChange}
            className={`navigation__lang-dropdown ${themeClasses.dropdownClass}`}
          >
            {languages.map((langOption) => (
              <option key={langOption} value={langOption}>
                {langOption.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <ul className="navigation__content">
          <li className="navigation__home-container">
            <Link to="/" className="navigation__link">
              <p
                className={`navigation__home ${themeClasses.navigationHomeClass}`}
              >
                {t("nav.home")}
              </p>
            </Link>
            {themeClasses.showVectorWhite && (
              <span className="navigation__home_active">
                <picture>
                  <img
                    className="navigation__home-vector"
                    src={vectorWhiteImg}
                    alt={t("nav.whiteThemeVector")}
                  />
                </picture>
              </span>
            )}
          </li>

          {isLoggedIn && (
            <>
              <li className="navigation__saved-articles-container">
                <Link to="/saved-news" className="navigation__link">
                  <p
                    className={`navigation__saved-articles ${themeClasses.navigationSavedArticlesClass}`}
                  >
                    {t("nav.savedArticles")}
                  </p>
                </Link>
                {themeClasses.showVectorDark &&
                  location.pathname === "/saved-news" && (
                    <span className="navigation__saved-articles_active">
                      <picture>
                        <img
                          className="navigation__saved-articles-vector"
                          src={vectorDarkImg}
                          alt={t("nav.darkThemeVector")}
                        />
                      </picture>
                    </span>
                  )}
              </li>

              <li className="navigation__loggout-container">
                <button
                  type="submit"
                  className={`btn-logged-out ${themeClasses.btnLoggedOutClass}`}
                  onClick={() => handleSignOut()}
                >
                  <span>{currentUser?.name}</span>
                  <picture className="navigation__icon-logged-out">
                    <img
                      className="navigation__logged-out"
                      src={themeClasses.iconLoggedOutClass}
                      alt={t("nav.logOut")}
                    />
                  </picture>
                </button>
              </li>
            </>
          )}

          <li>
            {!isLoggedIn && (
              <button
                type="submit"
                className={`btn-logged-in ${themeClasses.btnLoggedInClass}`}
                onClick={handleButtonClick}
              >
                {buttonLabel}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Navigation;
