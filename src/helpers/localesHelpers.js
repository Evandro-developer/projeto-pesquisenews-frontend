import DE from "../locales/de.json";
import EN from "../locales/en.json";
import ES from "../locales/es.json";
import FR from "../locales/fr.json";
import IT from "../locales/it.json";
import PT from "../locales/pt.json";

// Objeto com o formato padrão de data usado para localização.
// Object with the standard date format used for localization.
const defaultFormatDate = { day: "numeric", month: "long", year: "numeric" };

// Especifica o formato da data para o local em inglês (EUA).
// Specifies the date format for English (US) locale.
const enFormatDate = { month: "long", day: "numeric", year: "numeric" };

// Mapeamento de locais e opções específicas por idioma
// Mapping of locales and specific options by language
const localeOptions = {
  de: { locale: "de-DE", options: defaultFormatDate },
  en: { locale: "en-US", options: enFormatDate },
  es: { locale: "es-ES", options: defaultFormatDate },
  fr: { locale: "fr-FR", options: defaultFormatDate },
  it: { locale: "it-IT", options: defaultFormatDate },
  pt: { locale: "pt-BR", options: defaultFormatDate },
};

// Array de códigos de idiomas suportados
// Array of supported language codes
const languages = ["de", "en", "es", "fr", "it", "pt"];

// Objeto que mapeia códigos de idioma para seus respectivos arquivos JSON de tradução.
// Object that maps language codes to their respective translation JSON files.
const i18nJsonMaps = {
  de: DE,
  en: EN,
  es: ES,
  fr: FR,
  it: IT,
  pt: PT,
};

// Busca e retorna a tradução para uma chave hierárquica, ou a chave se não encontrada.
// Searches and returns the translation for a hierarchical key, or the key if not found.
const getNestedTranslationValue = (translations, key) => {
  const keys = key.split(".");
  let value = translations;

  for (let k of keys) {
    value = value[k];
    if (!value) break;
  }

  return value;
};

// Fornece contexto de tradução para elementos específicos, independente da configuração global de idioma.
// Retrieves localized translation for the element, independent of the global language context.
const getStateLangForKey = (key, articleLang, defaultLang = "en") => {
  const translations = i18nJsonMaps[articleLang] || i18nJsonMaps[defaultLang];
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
