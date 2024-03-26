import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import useFilter from "./useFilter";
import { localStorageManager } from "../helpers/localStorageHelpers";

// Extracts a unique set of keywords from the articles, removing duplicates
// Extrai um conjunto único de palavras-chave dos artigos, removendo duplicatas
export const extractKeywords = (articles) => {
  const allKeywords = articles.map((article) => article.keyword);
  return [...new Set(allKeywords)];
};

export const useArticleDisplay = (
  isHomePage,
  isSavedNewsRoute,
  newsData,
  savedArticles,
  filteredHomeArticles,
  filteredSavedArticles,
  setNewsData,
  setFilteredHomeArticles,
  setQuery,
  searchdScrollY,
  setSearchdScrollY
) => {
  const { setShowFilterPanel } = useFilter();
  const ITEMS_PER_PAGE = 3;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [firstArticleLang, setFirstArticleLang] = useState("");
  const [articleKeywords, setArticleKeywords] = useState([]);
  const [hasClickedShowMore, setHasClickedShowMore] = useState(false);

  const lastNewsCardRef = useRef(null);

  const onShowMore = () => {
    setVisibleItems((prevCount) => prevCount + ITEMS_PER_PAGE);
    setHasClickedShowMore(true);
  };

  useEffect(() => {
    setShowFilterPanel(false);
  }, [isHomePage, isSavedNewsRoute, setShowFilterPanel]);

  useEffect(() => {
    const newsDataFromLocalStorage = localStorageManager.getNewsData();
    if (
      newsDataFromLocalStorage &&
      newsDataFromLocalStorage.articles &&
      newsDataFromLocalStorage.articles.length > 0
    ) {
      const extractedLang = newsDataFromLocalStorage.articles[0].lang;
      setFirstArticleLang(extractedLang);
    }
    savedArticles.length > 0
      ? setArticleKeywords(extractKeywords(savedArticles))
      : null;
  }, [newsData, savedArticles]);

  const onClearSearch = () => {
    localStorageManager.removeNewsData();
    localStorageManager.removeNewsFilters();
    setNewsData([]);
    setFilteredHomeArticles([]);
    setQuery("");
  };

  // Function to determine which articles to render based on the current route.
  // Função para determinar quais artigos renderizar com base na rota atual.
  const chooseArticlesToRender = useCallback(() => {
    if (isHomePage) {
      // Returns filtered articles for the home page, or all searched articles if there are no filters applied.
      // Retorna artigos filtrados para a página inicial, ou todos os artigos pesquisados se não houver filtros aplicados.
      return filteredHomeArticles.length > 0 ? filteredHomeArticles : newsData;
    } else if (isSavedNewsRoute) {
      // Returns filtered articles for the saved news route, or all saved articles if there are no filters applied.
      // Retorna artigos filtrados para a rota de notícias salvas, ou todos os artigos salvos se não houver filtros aplicados.
      return filteredSavedArticles.length > 0
        ? filteredSavedArticles
        : savedArticles;
    }
    // Returns an empty array if there are no articles to render.
    // Retorna um array vazio se não houver artigos para renderizar.
    return [];
  }, [
    isHomePage,
    isSavedNewsRoute,
    filteredHomeArticles,
    filteredSavedArticles,
    newsData,
    savedArticles,
  ]);

  // Uses the useMemo hook to memorize the list of articles to be rendered. Reduces unnecessary re-renders and processing.
  // Utiliza o hook useMemo para memorizar a lista de artigos a ser renderizada. Reduz re-renderizações desnecessárias e processamento.
  const articlesToRender = useMemo(
    () => chooseArticlesToRender(),
    [chooseArticlesToRender]
  );

  useEffect(() => {
    if (
      (hasClickedShowMore || searchdScrollY) &&
      lastNewsCardRef.current &&
      articlesToRender.length > 0 &&
      visibleItems % ITEMS_PER_PAGE === 0
    ) {
      const lastCardPosition =
        lastNewsCardRef.current.getBoundingClientRect().bottom;

      // Dynamically define the offset based on the window width
      // Define o offset dinamicamente com base na largura da janela
      let offset;
      if (window.innerWidth > 968) {
        offset = 64 + 64 + 80;
      } else if (window.innerWidth > 768) {
        offset = 64 + 32 + 64;
      } else if (window.innerWidth > 648) {
        offset = 56 + 32 + 64;
      } else {
        offset = 56 + 24 + 64;
      }

      // Calculate the desired scroll position
      // Calcula a posição de rolagem desejada
      const scrollPosition =
        lastCardPosition +
        window.scrollY -
        document.documentElement.clientHeight +
        offset;

      // Scroll to the calculated position
      // Executa a rolagem para a posição calculada
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  }, [visibleItems, articlesToRender, hasClickedShowMore, searchdScrollY]);

  useEffect(() => {
    setHasClickedShowMore(false);
  }, [isHomePage, isSavedNewsRoute]);

  useEffect(() => {
    if (searchdScrollY) {
      setSearchdScrollY(false);
    }
  }, [searchdScrollY, setSearchdScrollY]);

  return {
    onShowMore,
    onClearSearch,
    articlesToRender,
    visibleItems,
    firstArticleLang,
    articleKeywords,
    lastNewsCardRef,
  };
};
