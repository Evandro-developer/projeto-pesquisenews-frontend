import React from "react";
import { Link } from "react-router-dom";
import iconGithub from "../images/icon_github.png";
import iconLinkedin from "../images/icon_linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyrights">
          &copy; 2023, desenvolvido por Evandro M Oliveira
        </p>
        <nav className="footer__list">
          <ul className="footer__content">
            <li>
              <p className="footer__text">
                <Link to="/" className="footer__link">
                  Home
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
                    alt="Imagem com o ícone do Github"
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
                    alt="Imagem com o ícone do Linkedin"
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
