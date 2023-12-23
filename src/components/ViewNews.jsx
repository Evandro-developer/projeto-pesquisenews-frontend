import { useState } from "react";
import Navigation from "./Navigation";
import ViewNewsHeader from "./ViewNewsheader";
import ImagePopup from "./ImagePopup";

function ViewNews({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  onLogout,
  handleSignOut,
  savedArticles,
  setSavedArticles,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (urlToImage) => {
    setSelectedImage(urlToImage);
  };

  return (
    <section className="view-news">
      <div className="view-news__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          onLogout={onLogout}
          handleSignOut={handleSignOut}
          savedArticles={savedArticles}
        />
        <ViewNewsHeader
          isLoggedIn={isLoggedIn}
          onImageClick={handleImageClick}
          selectedImage={selectedImage}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
        />
        {selectedImage && (
          <ImagePopup
            selectedImage={selectedImage}
            onCloseImageClick={() => setSelectedImage(null)}
          />
        )}
      </div>
    </section>
  );
}

export default ViewNews;
