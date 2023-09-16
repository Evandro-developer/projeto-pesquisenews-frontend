import React, { useState, useEffect } from "react";
import PopupLogin from "./PopupLogin";
import PopupRegister from "./PopupRegister";

function PopupController({ setIsPopupOpen, handleLogin, setIsLoggedIn }) {
  const [isToggledPopup, setIsToggledPopup] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("popup")) {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsPopupOpen]);

  return isToggledPopup ? (
    <PopupLogin
      setIsPopupOpen={setIsPopupOpen}
      setIsToggledPopup={setIsToggledPopup}
      onSubmit={handleLogin}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    <PopupRegister
      setIsPopupOpen={setIsPopupOpen}
      setIsToggledPopup={setIsToggledPopup}
    />
  );
}

export default PopupController;
