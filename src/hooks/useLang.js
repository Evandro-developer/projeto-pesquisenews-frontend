import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";

const useLang = () => {
  const context = useContext(LangContext);

  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider");
  }

  return context;
};

export default useLang;
