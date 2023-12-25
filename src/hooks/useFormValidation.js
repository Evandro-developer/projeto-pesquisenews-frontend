import { useState, useCallback } from "react";

import {
  requiredFieldsConfig,
  useValidationConfig,
} from "./useValidationConfig";
import { validateInput } from "../helpers/formValidationHelpers";

// Inicializa o estado inputActive com todos os campos de validationConfig
// Initializes the inputActive state with all fields from validationConfig
const initialInputActiveState = Object.keys(useValidationConfig).reduce(
  (initialInputs, key) => {
    initialInputs[key] = false;
    return initialInputs;
  },
  {}
);

// useForm é um hook personalizado para validação de formulários
// useForm is a custom hook for form validation
function useForm(formName) {
  // Obter validationConfig do contexto de linguagem
  // Retrieve validationConfig from the language context
  const validationConfig = useValidationConfig();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputActive, setInputActive] = useState(initialInputActiveState);

  // Manipula a mudança no input e valida o campo
  // Handles input change and validates the field
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const errorMessage = validateInput(name, value, validationConfig);
    const newValues = { ...values, [name]: value };
    const newErrors = { ...errors, [name]: errorMessage };

    // Atualiza os estados de values e errors
    // Updates the states of values and errors
    setValues(newValues);
    setErrors(newErrors);

    // Verifica se todos os campos obrigatórios são válidos
    // Checks if all required fields are valid
    const requiredFields = requiredFieldsConfig[formName] || [];
    const allFieldsValid = requiredFields.every((field) => {
      return !newErrors[field] && newValues[field];
    });

    setIsValid(allFieldsValid);
    setInputActive({ ...inputActive, [name]: true });
  };

  // Manipula o evento de desfocar do input
  // Handles the input's blur event
  const handleBlur = (name) => {
    setInputActive({ ...inputActive, [name]: false });
  };

  // Reseta o formulário para o estado inicial ou valores fornecidos
  // Resets the form to the initial state or provided values
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    inputActive,
    isValid,
    setValues,
    setErrors,
    setInputActive,
    setIsValid,
    handleChange,
    handleBlur,
    resetForm,
  };
}

// Aprimora o useForm com funcionalidades adicionais específicas para validação
// Enhances useForm with additional functionalities specific for validation
function useFormWithValidation(formName) {
  const formControl = useForm(formName);

  const handleChange = (evt) => {
    formControl.handleChange(evt);
  };

  return {
    ...formControl,
    handleChange,
  };
}

export default useFormWithValidation;
