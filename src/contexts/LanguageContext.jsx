import React, { createContext, useContext, useState, useEffect } from "react";
import { i18nJsonMaps } from "../helpers/localesHelpers";

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

  // Busca e retorna a tradução para uma chave hierárquica, ou a chave se não encontrada.
  // Searches and returns the translation for a hierarchical key, or the key if not found.
  const t = (key) => {
    const keys = key.split(".");
    let value = translations;

    for (let k of keys) {
      value = value[k];
      // Fallback para a chave original se a tradução não for encontrada
      // Fallback to the original key if the translation is not found.
      if (!value) return key;
    }

    return value;
  };

  const value = { t, lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
