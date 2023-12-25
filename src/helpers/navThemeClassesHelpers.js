import iconLoggedOut from "../images/icon_logged_out.svg";
import iconLoggedOutThemeDark from "../images/icon_logged_out_theme_dark.svg";

const getNavThemeClasses = (theme) => {
  return {
    showVectorWhite: theme === "light",
    showVectorDark: theme === "dark",
    titleClass: theme === "dark" ? "navigation__title_theme_dark" : "",
    dropdownClass:
      theme === "dark" ? "navigation__lang-dropdown_theme_dark" : "",
    navigationHomeClass: theme === "dark" ? "navigation__home_theme_dark" : "",
    navigationSavedArticlesClass:
      theme === "dark" ? "navigation__saved-articles_theme_dark" : "",
    btnLoggedInClass: theme === "dark" ? "btn-logged-in_theme_dark" : "",
    btnLoggedOutClass: theme === "dark" ? "btn-logged-out_theme_dark" : "",
    iconLoggedOutClass:
      theme === "dark" ? iconLoggedOutThemeDark : iconLoggedOut,
  };
};

export default getNavThemeClasses;
