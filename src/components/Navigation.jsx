import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { LangContext } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useRouteChecker from "../hooks/useRouteChecker";
import navThemeClassesHelpers from "../helpers/navThemeClassesHelpers";
import NAV_PATHS from "../utils/navPaths";
import vectorWhiteImg from "../images/vector_white.svg";
import vectorDarkImg from "../images/vector_dark.svg";

function Navigation({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  handleSignOut,
}) {
  const navigate = useNavigate();
  const { t, lang, setLang, allLangOptions } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { isSigninRoute, isSignupRoute, isSavedNewsRoute, isHomePage } =
    useRouteChecker();

  const [buttonLabel, setButtonLabel] = useState("Entrar");
  const [popupType, setPopupType] = useState("login");
  const [navigatePath, setNavigatePath] = useState(NAV_PATHS.MAIN);
  const [theme, setTheme] = useState(!isHomePage ? "dark" : "light");

  const themeClasses = navThemeClassesHelpers(theme);

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
    isHomePage ? setTheme("light") : setTheme("dark");
  }, [isHomePage]);

  useEffect(() => {
    if (isSignupRoute) {
      setButtonLabel(t("nav.signUp"));
      setPopupType("PopupRegister");
      setNavigatePath(NAV_PATHS.SIGNIN);
      setIsLoggedIn(false);
    } else if (isSigninRoute) {
      setButtonLabel(t("nav.signIn"));
      setPopupType("PopupLogin");
      setNavigatePath(NAV_PATHS.MAIN);
      setIsLoggedIn(false);
    }
  }, [isSignupRoute, isSigninRoute, t]);

  return (
    <section className="navigation">
      <nav className="navigation__container">
        <div className="navigation__branding">
          <h1 className={`navigation__title ${themeClasses.titleClass}`}>
            <Link to={NAV_PATHS.MAIN} className="navigation__link">
              {t("nav.title")}
            </Link>
          </h1>
          <LanguageSelector
            value={lang}
            onChange={handleLangChange}
            className={`navigation__lang-dropdown ${themeClasses.dropdownClass}`}
            renderOptions={allLangOptions()}
          />
        </div>
        <ul className="navigation__content">
          <li className="navigation__home-container">
            <Link to={NAV_PATHS.MAIN} className="navigation__link">
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
                <Link to={NAV_PATHS.SAVED_NEWS} className="navigation__link">
                  <p
                    className={`navigation__saved-articles ${themeClasses.navigationSavedArticlesClass}`}
                  >
                    {t("nav.savedArticles")}
                  </p>
                </Link>
                {themeClasses.showVectorDark && isSavedNewsRoute && (
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
