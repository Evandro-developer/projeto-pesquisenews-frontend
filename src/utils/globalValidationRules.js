import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";

export const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,100}$/;
export const nameRegex = /^.{2,40}$/;

export const useValidationConfig = () => {
  const { t } = useContext(LangContext);

  return {
    email: {
      required: true,
      errorMessage: t("validation.emailRequired"),
      pattern: {
        value: emailRegex,
        message: t("validation.emailPattern"),
      },
    },
    password: {
      required: true,
      errorMessage: t("validation.passwordRequired"),
      minLength: { value: 6, message: t("validation.passwordMinLength") },
      maxLength: { value: 100, message: t("validation.passwordMaxLength") },
      pattern: {
        value: passwordRegex,
        message: t("validation.passwordPattern"),
      },
    },
    name: {
      required: true,
      errorMessage: t("validation.nameRequired"),
      pattern: {
        value: nameRegex,
        message: t("validation.namePattern"),
      },
    },
    query: {
      required: true,
      errorMessage: t("validation.searchRequired"),
      minLength: {
        value: 2,
        message: t("validation.searchMinLength"),
      },
    },
  };
};

export const requiredFieldsConfig = {
  register: ["email", "password", "name"],
  login: ["email", "password"],
  searchNews: ["query"],
};

export function validateInput(name, value, validationConfig) {
  const validationRules = validationConfig[name];
  if (!validationRules) return "";

  if (validationRules.required && !value) {
    return validationRules.errorMessage;
  }
  if (validationRules.pattern && !validationRules.pattern.value.test(value)) {
    return validationRules.pattern.message;
  }
  if (
    validationRules.minLength &&
    value.length < validationRules.minLength.value
  ) {
    return validationRules.minLength.message;
  }
  if (
    validationRules.maxLength &&
    value.length > validationRules.maxLength.value
  ) {
    return validationRules.maxLength.message;
  }

  return "";
}

const generateErrorClass = (base, errors, inputActive) => (errorType) => {
  return `${base}__input-error ${
    errors[errorType]
      ? `${base}__input_type_error ${base}__error_visible`
      : `${base}__error`
  } ${inputActive[errorType] ? `${base}__input_active` : ""}`;
};

export function errorClasses(errors, isValid, inputActive) {
  const generatePopupError = generateErrorClass("popup", errors, inputActive);
  const generateSearchFormError = generateErrorClass(
    "search-form",
    errors,
    inputActive
  );

  const [emailClassesError, passwordClassesError, nameClassesError] = [
    "email",
    "password",
    "name",
  ].map(generatePopupError);

  const queryClassesError = generateSearchFormError("query");

  const buttonClassesError = `btn-popup-submit ${
    !isValid ? "btn-popup-submit_disabled" : ""
  }`;

  return {
    emailClassesError,
    passwordClassesError,
    nameClassesError,
    queryClassesError,
    buttonClassesError,
  };
}
