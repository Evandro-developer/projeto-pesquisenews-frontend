import DE from "../locales/de.json";
import EN from "../locales/en.json";
import ES from "../locales/es.json";
import FR from "../locales/fr.json";
import IT from "../locales/it.json";
import PT from "../locales/pt.json";

// Objeto com o formato padrão de data usado para localização.
// Object with the standard date format used for localization.
const defaultOptions = { day: "numeric", month: "long", year: "numeric" };

// Mapeamento de locais e opções específicas por idioma
// Mapping of locales and specific options by language
const localeOptions = {
  en: {
    locale: "en-US",
    options: { month: "long", day: "numeric", year: "numeric" },
  },
  es: { locale: "es-ES", options: defaultOptions },
  de: { locale: "de-DE", options: defaultOptions },
  fr: { locale: "fr-FR", options: defaultOptions },
  it: { locale: "it-IT", options: defaultOptions },
  pt: { locale: "pt-BR", options: defaultOptions },
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

export { localeOptions, defaultOptions, languages, i18nJsonMaps };
