import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function PopupLogin({
  setIsPopupOpen,
  setIsToggledPopup,
  isPopupOpen,
  setIsLoggedIn,
  onSubmit,
}) {
  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation("login");

  const { emailClassesError, passwordClassesError, buttonClassesError } =
    errorClasses(errors, isValid, inputActive);

  useEffect(() => {
    if (!isPopupOpen) {
      resetForm();
    }
  }, [isPopupOpen, resetForm]);

  return (
    <PopupWithForm
      setIsPopupOpen={setIsPopupOpen}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit(values.email, values.password)) {
          setIsPopupOpen(false);
          setIsLoggedIn(true);
        }
      }}
    >
      <div className="popup__field">
        <label className="popup__label">E-mail</label>
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder="Insira seu e-mail"
          value={values.email || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          errors={errors.email}
          errorClassName={emailClassesError}
          className={`popup__input`}
        />
      </div>
      <div className="popup__field">
        <label className="popup__label">Senha</label>
        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          value={values.password || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          errors={errors.password}
          errorClassName={passwordClassesError}
          className={`popup__input`}
        />
      </div>
      <ButtonSubmit className={buttonClassesError} isValid={isValid}>
        Entrar
      </ButtonSubmit>
      <div className="popup__sign-option">
        <span className="popup__or-text">ou</span>
        <span
          className="popup__sign-text"
          onClick={() => setIsToggledPopup(false)}
        >
          Inscreva-se
        </span>
      </div>
    </PopupWithForm>
  );
}

export default PopupLogin;
