import DE from "../locales/de.json";
import EN from "../locales/en.json";
import ES from "../locales/es.json";
import FR from "../locales/fr.json";
import IT from "../locales/it.json";
import PT from "../locales/pt.json";

// Object with the standard date format used for localization.
// Objeto com o formato padrão de data usado para localização.
const defaultFormatDate = { day: "numeric", month: "long", year: "numeric" };

// Specifies the date format for English (US) locale.
// Especifica o formato da data para o local em inglês (EUA).
const enFormatDate = { month: "long", day: "numeric", year: "numeric" };

// Mapping of locales and specific options by language
// Mapeamento de locais e opções específicas por idioma
const localeOptions = {
  de: { locale: "de-DE", options: defaultFormatDate },
  en: { locale: "en-US", options: enFormatDate },
  es: { locale: "es-ES", options: defaultFormatDate },
  fr: { locale: "fr-FR", options: defaultFormatDate },
  it: { locale: "it-IT", options: defaultFormatDate },
  pt: { locale: "pt-BR", options: defaultFormatDate },
};

// Array of supported language codes
// Array de códigos de idiomas suportados
const languages = ["de", "en", "es", "fr", "it", "pt"];

// Object that maps language codes to their respective translation JSON files.
// Objeto que mapeia códigos de idioma para seus respectivos arquivos JSON de tradução.
const i18nJsonMaps = {
  de: DE,
  en: EN,
  es: ES,
  fr: FR,
  it: IT,
  pt: PT,
};

// Searches and returns the translation for a hierarchical key, or the key if not found.
// Busca e retorna a tradução para uma chave hierárquica, ou a chave se não encontrada.
const getNestedTranslationValue = (translations, key) => {
  const keys = key.split(".");
  let value = translations;

  for (let k of keys) {
    value = value[k];
    if (!value) break;
  }

  return value;
};

// Retrieves localized translation for the element, independent of the global language context.
// Fornece contexto de tradução para elementos específicos, independente da configuração global de idioma.
const getStateLangForKey = (key, specificLang, defaultLang = "en", t) => {
  const translations = i18nJsonMaps[specificLang] || i18nJsonMaps[defaultLang];
  const nestedValue = getNestedTranslationValue(translations, key);

  return nestedValue || t(key);
};

export {
  localeOptions,
  languages,
  i18nJsonMaps,
  getNestedTranslationValue,
  getStateLangForKey,
};
