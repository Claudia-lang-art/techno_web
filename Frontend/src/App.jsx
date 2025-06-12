import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  const navigate = useNavigate
  return (
    <Router>
      {/* ✅ Barre de navigation toujours visible */}
      <Header />

      {/* ✅ Contenu des pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" 
          element={
            <ProductDetails 
              navigate={navigate} 
            />
          } 
        />        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* ✅ Footer toujours visible */}
      <Footer />
    </Router>
  );
}

export default App;
