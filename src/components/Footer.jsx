import { Link } from "react-router-dom";
import useLang from "../hooks/useLang";
import useRouteChecker from "../hooks/useRouteChecker";
import NAV_PATHS from "../utils/navPaths";
import iconGithub from "../images/icon_github.svg";
import iconLinkedin from "../images/icon_linkedin.svg";

function Footer() {
  const { t } = useLang();
  const { isMainRoute } = useRouteChecker();
  const isNotMainRoute = !isMainRoute;

  return (
    <footer className="footer">
      <div className="footer__container">
        <p
          className={`footer__copyrights ${
            isNotMainRoute ? "footer__copyrights_not-main-route" : ""
          }`}
        >
          &copy; {t("footer.copyrights")}
        </p>
        <nav className="footer__list">
          <ul className="footer__content">
            <li>
              <p className="footer__text">
                <Link to={NAV_PATHS.MAIN} className="footer__link">
                  {t("footer.home")}
                </Link>
              </p>
            </li>
            <li>
              <p className="footer__text">
                <a
                  href="https://tripleten.com/pt-bra/"
                  className="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tripleten
                </a>
              </p>
            </li>
          </ul>
          <ul className="footer__social">
            <li>
              <a
                href="https://github.com/evandro-developer"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <picture>
                  <img
                    className="footer__icon-link"
                    src={iconGithub}
                    alt={t("footer.iconGithub")}
                  />
                </picture>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/evandrodemelo/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <picture>
                  <img
                    className="footer__icon-link"
                    src={iconLinkedin}
                    alt={t("footer.iconLinkedin")}
                    loading="lazy"
                  />
                </picture>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
