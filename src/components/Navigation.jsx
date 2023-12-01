import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import vectorWhiteImg from "../images/vector_white.svg";
import vectorDarkImg from "../images/vector_dark.svg";
import iconLoggedOut from "../images/icon_logged_out.svg";
import iconLoggedOutThemeDark from "../images/icon_logged_out_theme_dark.svg";

function Navigation({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  handleSignOut,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [buttonLabel, setButtonLabel] = useState("Entrar");
  const [popupType, setPopupType] = useState("login");
  const [navigatePath, setNavigatePath] = useState("/");
  const [theme, setTheme] = useState(
    location.pathname === "/saved-news" ? "dark" : "light"
  );

  const showVectorWhite = theme === "light";
  const showVectorDark = theme === "dark";
  const titleClass = theme === "dark" ? "navigation__title_theme_dark" : "";
  const navigationHomeClass =
    theme === "dark" ? "navigation__home_theme_dark" : "";
  const navigationSavedArticlesClass =
    theme === "dark" ? "navigation__saved-articles_theme_dark" : "";
  const btnLoggedInClass = theme === "dark" ? "btn-logged-in_theme_dark" : "";
  const btnLoggedOutClass = theme === "dark" ? "btn-logged-out_theme_dark" : "";
  const iconLoggedOutClass =
    theme === "dark" ? iconLoggedOutThemeDark : iconLoggedOut;

  const handleButtonClick = (evt) => {
    evt.preventDefault();

    if (popupType === "PopupRegister" || popupType === "PopupLogin") {
      setIsPopupOpen(true);
      return;
    }

    navigate(navigatePath);
  };

  useEffect(() => {
    setTheme(location.pathname === "/saved-news" ? "dark" : "light");
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setButtonLabel("Inscreva-se");
      setPopupType("PopupRegister");
      setNavigatePath("/signin");
      setIsLoggedIn(false);
    } else if (location.pathname === "/signin") {
      setButtonLabel("Entrar");
      setPopupType("PopupLogin");
      setNavigatePath("/");
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  return (
    <section className="navigation">
      <nav className="navigation__container">
        <h1 className={`navigation__title ${titleClass}`}>
          <Link to="/" className="navigation__link">
            PesquiseNews
          </Link>
        </h1>
        <ul className="navigation__content">
          <li className="navigation__home-container">
            <Link to="/" className="navigation__link">
              <p className={`navigation__home ${navigationHomeClass}`}>Home</p>
            </Link>
            {showVectorWhite && (
              <span className="navigation__home_active">
                <picture>
                  <img
                    className="navigation__home-vector"
                    src={vectorWhiteImg}
                    alt="Vetor de imagem marcando a página Home"
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
                    className={`navigation__saved-articles ${navigationSavedArticlesClass}`}
                  >
                    Artigos Salvos
                  </p>
                </Link>
                {showVectorDark && (
                  <span className="navigation__saved-articles_active">
                    <picture>
                      <img
                        className="navigation__saved-articles-vector"
                        src={vectorDarkImg}
                        alt="Vetor de imagem marcando a página artigos salvos"
                      />
                    </picture>
                  </span>
                )}
              </li>

              <li className="navigation__loggout-container">
                <button
                  type="submit"
                  className={`btn-logged-out ${btnLoggedOutClass}`}
                  onClick={() => handleSignOut()}
                >
                  <span>{currentUser?.name}</span>
                  <picture className="navigation__icon-logged-out">
                    <img
                      className="navigation__logged-out"
                      src={iconLoggedOutClass}
                      alt="Ícone do botão loggout"
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
                className={`btn-logged-in ${btnLoggedInClass}`}
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
