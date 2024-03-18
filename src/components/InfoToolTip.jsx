import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useCloseTooltip from "../hooks/useClosePopupAndTooltip";
import useRouteChecker from "../hooks/useRouteChecker";
import closedBtn from "../images/icon_close.svg";
import closedBtnSmall from "../images/icon_close_small.svg";

function InfoToolTip({
  isToolTipOpen,
  setIsPopupOpen,
  isClosing,
  registerSuccess,
  handleCloseInfoToolTip,
}) {
  const { t } = useContext(LangContext);
  const { isSigninRoute, isSignupRoute } = useRouteChecker();

  useCloseTooltip(
    isToolTipOpen,
    handleCloseInfoToolTip,
    isClosing,
    "infoToolTip__opened"
  );

  const handleAction = () => {
    handleCloseInfoToolTip();
    setIsPopupOpen(true);
  };

  const retryActionText = isSigninRoute
    ? t("infoToolTip.retrySignIn")
    : isSignupRoute
    ? t("infoToolTip.retrySignUp")
    : "";

  let message;
  switch (registerSuccess) {
    case "success":
      message = t("infoToolTip.successMessage");
      break;
    case "loginError":
      message = t("infoToolTip.loginErrorMessage");
      break;
    case "registerError":
      message = t("infoToolTip.registerErrorMessage");
      break;
  }

  return (
    <section
      className={`infoToolTip ${isToolTipOpen ? "infoToolTip__opened" : ""} ${
        isClosing ? "infoToolTip__closed" : ""
      }`}
    >
      <div className="infoToolTip__container">
        <h2 className="infoToolTip__heading">{message}</h2>
        {registerSuccess === "success" && (
          <span
            role="button"
            className="infoToolTip__signin_or_retry-text"
            onClick={handleAction}
          >
            {t("infoToolTip.signIn")}
          </span>
        )}
        {["loginError", "registerError"].includes(registerSuccess) && (
          <span
            role="button"
            className="infoToolTip__signin_or_retry-text"
            onClick={handleAction}
          >
            {retryActionText}
          </span>
        )}
        <picture>
          <source media="(max-width: 584px)" srcSet={closedBtnSmall} />
          <img
            aria-label="Close button"
            onClick={handleCloseInfoToolTip}
            className="btn-info-tooltip-closed"
            src={closedBtn}
            alt={t("infoToolTip.pictureAlt")}
          />
        </picture>
      </div>
    </section>
  );
}

export default InfoToolTip;
