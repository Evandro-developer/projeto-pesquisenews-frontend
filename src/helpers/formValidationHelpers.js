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
