import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Infrastructure from "./pages/Infrastructure";
import Quality from "./pages/Quality";
import Product from "./pages/Product";
import AdminDashboard from "./pages/AdminDashboard";
// just text 1.0
function App() {
  const location = useLocation(); // Get the current location

  // Check if the current route is `/Admin`
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdminRoute && <NavBar />} {/* Render NavBar only if not on the Admin route */}

      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />} {/* Render Footer only if not on the Admin route */}
    </>
  );
}

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
