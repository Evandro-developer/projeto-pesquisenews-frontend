import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LangProvider } from "./contexts/LanguageContext.jsx";
import App from "./components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <LangProvider>
      <div className="page">
        <div className="root">
          <App />
        </div>
      </div>
    </LangProvider>
  </Router>
);
