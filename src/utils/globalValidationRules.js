export const validationConfig = {
  email: {
    required: true,
    errorMessage: "Email é requerido",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "E-mail no formato 'nome@dominio.com'.",
    },
  },
  password: {
    required: true,
    errorMessage: "Senha é requerida",
    minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" },
    maxLength: {
      value: 100,
      message: "Senha deve ter no máximo 100 caracteres",
    },
  },
  name: {
    required: true,
    errorMessage: "Nome é requerido",
    minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" },
    maxLength: { value: 40, message: "Nome deve ter no máximo 40 caracteres" },
  },
  query: {
    required: true,
    errorMessage: "O campo de pesquisa é requerido",
    minLength: { value: 2, message: "Pesquisar com pelo menos 2 caracteres" },
    maxLength: { value: 40, message: "Pesquisar com no máximo 40 caracteres" },
  },
};

export const requiredFieldsConfig = {
  register: ["email", "password", "name"],
  login: ["email", "password"],
  searchNews: ["query"],
};

export function validateInput(name, value) {
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
