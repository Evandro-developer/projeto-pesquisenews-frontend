import { useState } from "react";
import useLang from "../hooks/useLang";
import useRouteChecker from "../hooks/useRouteChecker";
import PopupLogin from "./PopupLogin";
import PopupRegister from "./PopupRegister";
import PopupWithForm from "./PopupWithForm";

function PopupController({
  isClosing,
  isPopupOpen,
  setIsPopupOpen,
  onSignIn,
  onSignUp,
  onClose,
}) {
  const { t } = useLang();
  const { isSignupRoute } = useRouteChecker();
  const [formType, setFormType] = useState("login");
  const [isToggledPopup, setIsToggledPopup] = useState(
    isSignupRoute ? false : true
  );

  const toggleForm = () => {
    if (isToggledPopup) {
      setFormType("register");
    } else {
      setFormType("login");
    }
    setIsToggledPopup(!isToggledPopup);
  };

  const handleLoginSubmit = (values) =>
    values.email && values.password && onSignIn(values.email, values.password);

  const handleRegisterSubmit = (values) =>
    values.email &&
    values.password &&
    values.name &&
    onSignUp(values.email, values.password, values.name);

  return (
    <PopupWithForm
      isClosing={isClosing}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      onClose={onClose}
      title={
        isToggledPopup
          ? t("popupController.logInTitle")
          : t("popupController.signUpTitle")
      }
      onClick={(values) => {
        isToggledPopup
          ? handleLoginSubmit(values)
          : handleRegisterSubmit(values);
      }}
    >
      {isToggledPopup ? (
        <PopupLogin
          formType={formType}
          toggleForm={toggleForm}
          setIsToggledPopup={setIsToggledPopup}
          onSubmit={handleLoginSubmit}
          onClose={onClose}
        />
      ) : (
        <PopupRegister
          formType={formType}
          toggleForm={toggleForm}
          setIsToggledPopup={setIsToggledPopup}
          onSubmit={handleRegisterSubmit}
          onClose={onClose}
        />
      )}
    </PopupWithForm>
  );
}

export default PopupController;
