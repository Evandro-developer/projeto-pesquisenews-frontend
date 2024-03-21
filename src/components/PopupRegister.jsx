import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLang from "../hooks/useLang";
import useFormWithValidation from "../hooks/useFormValidation";
import { errorClasses } from "../helpers/errorClassHelpers";
import NAV_PATHS from "../utils/navPaths";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function PopupRegister({
  isPopupOpen,
  formType,
  toggleForm,
  setIsToggledPopup,
  handleSubmitPopup,
  handleClosePopup,
}) {
  const navigate = useNavigate();
  const { t } = useLang();
  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation(formType);

  const {
    emailClassesError,
    passwordClassesError,
    nameClassesError,
    buttonClassesError,
  } = errorClasses(errors, isValid, inputActive);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitPopup(values);
    handleClosePopup();
  };

  useEffect(() => {
    if (!isPopupOpen) {
      resetForm();
    }
  }, [resetForm, isPopupOpen]);

  return (
    <>
      <div className="popup__field">
        <label className="popup__label">{t("default.email")}</label>
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder={t("default.emailPlaceholder")}
          value={values.email || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          errors={errors.email}
          errorClassName={emailClassesError}
          className={`popup__input`}
        />
      </div>
      <div className="popup__field">
        <label className="popup__label">{t("default.password")}</label>
        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder={t("default.passwordPlaceholder")}
          value={values.password || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          errors={errors.password}
          errorClassName={passwordClassesError}
          className={`popup__input`}
        />
      </div>
      <div className="popup__field">
        <label className="popup__label">{t("popupRegister.name")}</label>
        <Input
          name="name"
          label="Nome de usuário"
          type="text"
          placeholder={t("popupRegister.namePlaceholder")}
          value={values.name || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          errors={errors.name}
          errorClassName={nameClassesError}
          className={`popup__input`}
        />
      </div>
      <ButtonSubmit
        className={buttonClassesError}
        isValid={isValid}
        onClick={(e) => handleSubmit(e)}
      >
        {t("popupRegister.btnSignUp")}
      </ButtonSubmit>
      <div className="popup__sign-option">
        <span className="popup__or-text">{t("default.orText")}</span>
        <span
          role="button"
          className="popup__sign-text"
          onClick={() => {
            toggleForm();
            setIsToggledPopup(true);
            navigate(NAV_PATHS.SIGNIN);
          }}
        >
          {t("popupRegister.signIn")}
        </span>
      </div>
    </>
  );
}

export default PopupRegister;
