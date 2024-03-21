import { createContext, useState, useEffect, useMemo } from "react";
import { localStorageManager } from "../helpers/localStorageHelpers";
import EN from "../locales/en.json";
import {
  languages,
  i18nJsonMaps,
  getNestedTranslationValue,
} from "../helpers/localesHelpers";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorageManager.getCurrentLang());

  useEffect(() => {
    localStorageManager.saveCurrentLang(lang);
  }, [lang]);

  const allLangOptions = () => {
    return languages.map((langOption) => (
      <option key={langOption} value={langOption}>
        {langOption.toUpperCase()}
      </option>
    ));
  };

  const translations = useMemo(() => i18nJsonMaps[lang] || EN, [lang]);

  const t = (key, replacements = {}) => {
    let value = getNestedTranslationValue(translations, key) || key;
    if (typeof value === "object" && value !== null) {
      return value;
    } else {
      Object.keys(replacements).forEach((replacementKey) => {
        const replacementValueStr = String(replacements[replacementKey]);
        const regex = new RegExp(`{${replacementKey}}`, "g");
        value = value.replace(regex, replacementValueStr);
      });
      return value;
    }
  };

  const value = { t, lang, setLang, allLangOptions };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
