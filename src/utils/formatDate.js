const formatDate = (publishedAt, lang, localeOptions) => {
  const { locale, options } = localeOptions[lang] || localeOptions["en"];
  return new Date(publishedAt).toLocaleDateString(locale, options);
};

export default formatDate;
