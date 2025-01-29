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
import { AuthProvider, AuthContext } from "./components/Context"; // Fix capitalization

function App() {
  const location = useLocation(); // Get the current location
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if it's an admin route

  const { user } = useContext(AuthContext); // Move this inside AuthProvider

  return (
    <>
      {!isAdminRoute && <NavBar />} {/* Render NavBar only if not on the Admin route */}

      <div className="overflow-x-hidden">
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
