import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import imgSpinner from "../images/img_spinner.svg";
import imgErrorSearchArticle from "../images/img_error_search_article.svg";

function Preload({ isError }) {
  const { t } = useContext(LangContext);

  if (isError) {
    return (
      <section className="preload">
        <div className="preload__content-error">
          <picture>
            <img
              className="preload__error-img"
              src={imgErrorSearchArticle}
              alt={t("preload.pictureError")}
            />
          </picture>
          <h2 className="preload__heading-error">{t("preload.errorTitle")}</h2>
          <p className="preload__text-error">{t("preload.errorText")}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="preload">
      <div className="preload__content-spinner">
        <picture>
          <img
            className="preload__spinner-img"
            src={imgSpinner}
            alt={t("preload.pictureSpinner")}
          />
        </picture>
        <h3 className="preload__heading-spinner">{t("preload.spinner")}</h3>
      </div>
    </section>
  );
}

export default Preload;
