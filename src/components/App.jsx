import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import SavedNews from "./SavedNews";
import PopupController from "./PopupController";
import api from "../utils/ThirdPartyApi";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [query, setQuery] = useState("");

  // temporariamente para testes até implementar o backend
  const userName = "Evandro de Melo";

  const handleSearch = (query) => {
    setIsLoading(true);
    setNewsData([]);
    setQuery(query);

    api
      .fetchEverything({ q: query })
      .then((data) => {
        if (data.articles && data.articles.length === 0) {
          throw new Error("Nada encontrado.");
        }
        setNewsData(data.articles || []);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar notícias:", err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    localStorage.setItem("newsData", JSON.stringify(newsData));
  }, [newsData]);

  useEffect(() => {
    const savedNewsData = localStorage.getItem("newsData");
    if (savedNewsData) {
      setNewsData(JSON.parse(savedNewsData));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <div className="root">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Header
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      setIsPopupOpen={setIsPopupOpen}
                      onSearch={handleSearch}
                      userName={userName}
                    />
                    <Main
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                      isError={isError}
                      newsData={newsData}
                    />
                  </div>
                }
              />
              <Route
                path="/saved-news"
                element={
                  <div>
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      setIsPopupOpen={setIsPopupOpen}
                      newsData={newsData}
                      userName={userName}
                      query={query}
                    />
                  </div>
                }
              />
            </Routes>
            <Footer />
          </Router>
          {isPopupOpen && (
            <PopupController
              setIsLoggedIn={setIsLoggedIn}
              setIsPopupOpen={setIsPopupOpen}
              userName={userName}
            />
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
