import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import ViewNewsHeader from "./ViewNewsheader";
import ImagePopup from "./ImagePopup";

function ViewNews({
  isLoggedIn,
  setIsLoggedIn,
  isClosing,
  setIsClosing,
  setIsPopupOpen,
  savedArticles,
  setSavedArticles,
  onLogout,
  handleSignOut,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const articleData = location.state;

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (urlToImage) => {
    setSelectedImage(urlToImage);
  };

  useEffect(() => {
    if (!articleData) {
      navigate("/");
    }
  }, [articleData, navigate]);

  if (!articleData) {
    return null;
  }

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
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            onCloseImageClick={() => setSelectedImage(null)}
          />
        )}
      </div>
    </section>
  );
}

export default ViewNews;
