import { useContext, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { LangContext } from "../contexts/LanguageContext";
import useFormWithValidation from "../hooks/useFormValidation";
import { errorClasses } from "../helpers/errorClassHelpers";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function SearchForm({ onSearch, searchLang, setSearchLang }) {
  const { t, lang } = useContext(LangContext);

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
      onSearch(values.query, searchLang);
    }
  };

  useEffect(() => {
    setSearchLang(lang);
  }, [lang]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <h2 className="search-form__title"> {t("searchNews.title")}</h2>
        <p className="search-form__subtitle">{t("searchNews.subtitle")}</p>
        <div className="search-form__input-container">
          <Input
            name="query"
            type="text"
            placeholder={t("searchNews.placeholder")}
            value={values.query || ""}
            onChange={handleChange}
            onBlur={() => handleBlur("query")}
            errors={errors.query}
            errorClassName={queryClassesError}
            className={`search-form__input`}
          />
          <LanguageSelector
            value={searchLang}
            onChange={(e) => setSearchLang(e.target.value)}
            className="search-form__lang-dropdown"
          />
          <ButtonSubmit className="btn-search-form" isValid={isValid}>
            {t("searchNews.btnSearch")}
          </ButtonSubmit>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
