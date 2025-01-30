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
import { AuthContext } from "./components/Context"; 
import SEO from "./components/Seo"; // Import SEO component

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { user } = useContext(AuthContext);

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <div className="overflow-x-hidden">
        <SEO /> {/* Include SEO without props */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/admin/*" element={user ? <AdminDashboard /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
