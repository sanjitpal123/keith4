import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SeoProvider } from "./components/seocontext"; // Import SeoProvider
import { AuthProvider } from "./components/Context"; // Import AuthProvider
import App from "./App"; // Import App correctly

const Main = () => {
  return (
    <AuthProvider>
      <SeoProvider> {/* Wrap inside SeoProvider */}
        <HelmetProvider>
          <Router>
            <App />
          </Router>
        </HelmetProvider>
      </SeoProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
