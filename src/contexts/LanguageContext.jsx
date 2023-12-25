import React, { createContext, useContext, useState, useEffect } from "react";
import { localStorageManager } from "../helpers/localStorageHelpers";
import {
  i18nJsonMaps,
  getNestedTranslationValue,
} from "../helpers/localesHelpers";

export const LangContext = createContext();

export const useLang = () => {
  return useContext(LangContext);
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorageManager.getCurrentLang());

  useEffect(() => {
    localStorageManager.saveCurrentLang(lang);
  }, [lang]);

  // Seleciona o arquivo de tradução correto com base no idioma atual
  // Selects the correct translation file based on the current language
  const translations = i18nJsonMaps[lang] || EN;

  // Função para traduzir chaves com base nos valores fornecidos
  // Function to translate keys based on provided values
  const t = (key, replacements = {}) => {
    let value = getNestedTranslationValue(translations, key) || key;

    // Substitui cada chave de substituição no texto traduzido
    // Replaces each replacement key in the translated text
    Object.keys(replacements).forEach((replacementKey) => {
      const regex = new RegExp(`{${replacementKey}}`, "g");
      value = value.replace(regex, replacements[replacementKey]);
    });
    return value;
  };

  const value = { t, lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
