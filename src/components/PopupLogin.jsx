import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function PopupLogin({
  isPopupOpen,
  formType,
  toggleForm,
  setIsToggledPopup,
  handleSubmitPopup,
  handleClosePopup,
}) {
  const navigate = useNavigate();

  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation(formType);

  const { emailClassesError, passwordClassesError, buttonClassesError } =
    errorClasses(errors, isValid, inputActive);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitPopup(values);
    handleClosePopup();
  };

  useEffect(() => {
    if (!isPopupOpen) {
      resetForm();
    }
  }, [resetForm]);

  return (
    <>
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
      <ButtonSubmit
        className={buttonClassesError}
        isValid={isValid}
        onClick={(e) => handleSubmit(e)}
      >
        Entrar
      </ButtonSubmit>

      <div className="popup__sign-option">
        <span className="popup__or-text">ou</span>
        <span
          role="button"
          className="popup__sign-text"
          onClick={() => {
            toggleForm();
            setIsToggledPopup(false);
            navigate("/signup");
          }}
        >
          Inscreva-se
        </span>
      </div>
    </>
  );
}

export default PopupLogin;
