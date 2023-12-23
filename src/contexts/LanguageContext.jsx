import React, { createContext, useContext, useState, useEffect } from "react";
import {
  i18nJsonMaps,
  getNestedTranslationValue,
} from "../helpers/localesHelpers";

export const LangContext = createContext();

export const useLang = () => {
  return useContext(LangContext);
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("appLang") || "en");

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  // Seleciona o arquivo de tradução correto com base no idioma atual
  // Selects the correct translation file based on the current language
  const translations = i18nJsonMaps[lang] || EN;

  const t = (key) => {
    const value = getNestedTranslationValue(translations, key);
    return value || key;
  };

  const value = { t, lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
