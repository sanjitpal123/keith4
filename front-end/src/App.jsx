import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Infrastructure from './pages/Infrastructure';
// import Quality from './pages/Quality';
// import AdminDashboard from './pages/AdminDashboard';
// import Login from './components/Login';
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const Quality = lazy(() => import("./pages/Quality"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Login = lazy(() => import("./components/Login"));
const NavBar = lazy(() => import("./components/NavBar"));
const Footer = lazy(() => import("./components/Footer"));

import { useContext } from 'react';
import { AuthContext } from './components/Context';
import SEO from './components/Seo';
import CustomCursor from './components/CursorComponent';
import './index.css';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { user } = useContext(AuthContext);

  return (
    <div className="relative">
      <CustomCursor />
      {!isAdminRoute && <NavBar />}
      <div className={`overflow-x-hidden ${location.pathname === '/' ? '' : 'bg-gray-100'}`}>
        <SEO />
        <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/admin/*" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/admin/dashboard" /> : <Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </Suspense>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;