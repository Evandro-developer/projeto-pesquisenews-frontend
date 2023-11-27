import React from "react";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import bgimage_large from "../images/bgimage_large.png";
import bgimage_medium from "../images/bgimage_medium.png";
import bgimage_small from "../images/bgimage_small.png";

function Header({
  isLoggedIn,
  setIsLoggedIn,
  isPopupOpen,
  setIsPopupOpen,
  onLogout,
  handleSignOut,
  onSearch,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          onLogout={onLogout}
          handleSignOut={handleSignOut}
        />
        <SearchForm onSearch={onSearch} />
        <picture className="header__container-img">
          <source media="(max-width: 584px)" srcSet={bgimage_small} />
          <source media="(max-width: 768px)" srcSet={bgimage_medium} />
          <img
            srcSet={bgimage_large}
            alt="A imagem mostra um celular segurado por uma mão, com a tela voltada para cima.
            Exibe uma interface organizada com gráficos e informações relevantes."
            className="header__img"
          />
        </picture>
      </div>
    </header>
  );
}

export default Header;
