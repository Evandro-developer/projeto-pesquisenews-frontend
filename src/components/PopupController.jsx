import { useState } from "react";
import PopupLogin from "./PopupLogin";
import PopupRegister from "./PopupRegister";
import PopupWithForm from "./PopupWithForm";

function PopupController({
  isPopupOpen,
  setIsPopupOpen,
  handleSignIn,
  handleSignUp,
  isClosing,
  setIsClosing,
  isMounted,
  setIsMounted,
  handleClosePopup,
}) {
  const [isToggledPopup, setIsToggledPopup] = useState(
    location.pathname === "/signup" ? false : true
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
      setIsClosing={setIsClosing}
      isMounted={isMounted}
      setIsMounted={setIsMounted}
      handleClosePopup={handleClosePopup}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      title={isToggledPopup ? "Entrar" : "Inscreva-se"}
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
