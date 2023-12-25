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
