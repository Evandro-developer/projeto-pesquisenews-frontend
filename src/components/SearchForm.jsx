import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function SearchForm({ onSearch }) {
  const {
    values,
    errors,
    isValid,
    inputActive,
    setInputActive,
    handleBlur: originalHandleBlur,
    handleChange,
    resetForm,
  } = useFormWithValidation("searchNews");

  const { queryClassesError } = errorClasses(errors, isValid, inputActive);

  const handleBlur = (name) => {
    originalHandleBlur(name);

    if (name === "query" && (!values.query || values.query.trim() === "")) {
      resetForm();
    }
    setInputActive({ ...inputActive, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(values.query);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <h2 className="search-form__title">O que está acontecendo no mundo?</h2>
        <p className="search-form__subtitle">
          Encontre as últimas notícias sobre quaisquer temas e as salve em sua
          conta pessoal
        </p>
        <div className="search-form__input-container">
          <Input
            name="query"
            type="text"
            placeholder="Insira o tema da pesquisa"
            value={values.query || ""}
            onChange={handleChange}
            onBlur={() => handleBlur("query")}
            errors={errors.query}
            errorClassName={queryClassesError}
            className={`search-form__input`}
          />
          <ButtonSubmit className="btn-search-form" isValid={isValid}>
            Procurar
          </ButtonSubmit>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
