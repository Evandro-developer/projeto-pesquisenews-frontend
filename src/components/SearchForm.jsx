import { useEffect } from "react";
import useFilter from "../hooks/useFilter";
import useLang from "../hooks/useLang";
import useFormWithValidation from "../hooks/useFormValidation";
import useRouteChecker from "../hooks/useRouteChecker";
import { errorClasses } from "../helpers/errorClassHelpers";
import LanguageSelector from "./LanguageSelector";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function SearchForm({ searchLang, setSearchLang, setSearchScrollY, onSearch }) {
  const { t, lang, allLangOptions } = useLang();
  const { onClearFilteredHomeArticles, setPersistFilters } = useFilter();
  const { isHomePage } = useRouteChecker();

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
    if (onSearch && isHomePage) {
      // Only on the Home page: Deactivate filters persistence
      // Apenas na página Home: Desativa a persistência dos filtros
      setPersistFilters(false);
      // Clear filters applied on the Home page
      // Limpa os filtros aplicados na página Home
      onClearFilteredHomeArticles();
      // Execute the search function
      // Executa a função de busca
      onSearch(values.query, searchLang);
      // Trigger scroll to Preload component
      // Disparar a rolagem até o componente Preload
      setSearchScrollY(true);
    }
  };

  useEffect(() => {
    setSearchLang(lang);
  }, [lang, setSearchLang]);

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
            renderOptions={allLangOptions()}
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
