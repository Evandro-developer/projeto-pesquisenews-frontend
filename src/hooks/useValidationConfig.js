import useLang from "./useLang";

import {
  emailRegex,
  passwordRegex,
  nameRegex,
} from "../utils/validationPatterns";

export const requiredFieldsConfig = {
  register: ["email", "password", "name"],
  login: ["email", "password"],
  searchNews: ["query"],
};

export const useValidationConfig = () => {
  const { t } = useLang();

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
