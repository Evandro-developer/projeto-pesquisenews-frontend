import React from "react";
import About from "./About";
import NewsCardList from "./NewsCardList";
import Preload from "./Preload";

function Main({ isLoading, setIsLoading, isError, newsData, isLoggedIn }) {
  if (isLoading) {
    return (
      <div>
        <Preload isError={false} />;
        <About />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Preload isError={true} />
        <About />
      </div>
    );
  }

  return (
    <div>
      <NewsCardList
        setIsLoading={setIsLoading}
        newsData={newsData}
        isLoggedIn={isLoggedIn}
      />
      <About />
    </div>
  );
}

export default Main;
