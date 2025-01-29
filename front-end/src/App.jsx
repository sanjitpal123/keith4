import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Infrastructure from "./pages/Infrastructure";
import Quality from "./pages/Quality";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./components/Context"; 
import SEO from "./components/Seo"; // Fix capitalization

function App() {
  const location = useLocation(); // Get the current location
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if it's an admin route
  const { user } = useContext(AuthContext);

  // Define route-based SEO metadata (this could be fetched dynamically from an API)
  const getMetadata = () => {
    switch (location.pathname) {
      case "/":
        return { title: "Home", description: "Welcome to our homepage", keywords: "home, welcome" };
      case "/products":
        return { title: "Products", description: "Our amazing products", keywords: "products, buy" };
      case "/about":
        return { title: "About Us", description: "Learn more about us", keywords: "about, company" };
      case "/contact":
        return { title: "Contact Us", description: "Get in touch with us", keywords: "contact, support" };
      default:
        return { title: "Default Title", description: "Default Description", keywords: "default" };
    }
  };

  const metadata = getMetadata();

  return (
    <>
      {!isAdminRoute && <NavBar />} {/* Render NavBar only if not on the Admin route */}

      <div className="overflow-x-hidden">
        <SEO metadata={metadata} /> {/* Pass SEO metadata to SEO component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/admin/*" element={user ? <AdminDashboard /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />} {/* Render Footer only if not on the Admin route */}
    </>
  );
}

// ✅ Wrap everything inside `AuthProvider`
export default function Main() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}
