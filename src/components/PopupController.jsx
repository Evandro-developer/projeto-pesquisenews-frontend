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
  handleSignIn,
  handleSignUp,
  handleClosePopup,
}) {
  const { t } = useLang();
  const { isSignupRoute } = useRouteChecker();

  const [isToggledPopup, setIsToggledPopup] = useState(
    isSignupRoute ? false : true
  );
  const [formType, setFormType] = useState("login");

  const toggleForm = () => {
    if (isToggledPopup) {
      setFormType("register");
    } else {
      setFormType("login");
    }
    setIsToggledPopup(!isToggledPopup);
  };

  const handleLoginSubmit = (values) =>
    values.email &&
    values.password &&
    handleSignIn(values.email, values.password);

  const handleRegisterSubmit = (values) =>
    values.email &&
    values.password &&
    values.name &&
    handleSignUp(values.email, values.password, values.name);

  return (
    <PopupWithForm
      isClosing={isClosing}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      handleClosePopup={handleClosePopup}
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
          handleSubmitPopup={handleLoginSubmit}
          handleClosePopup={handleClosePopup}
        />
      ) : (
        <PopupRegister
          formType={formType}
          toggleForm={toggleForm}
          setIsToggledPopup={setIsToggledPopup}
          handleSubmitPopup={handleRegisterSubmit}
          handleClosePopup={handleClosePopup}
        />
      )}
    </PopupWithForm>
  );
}

export default PopupController;
