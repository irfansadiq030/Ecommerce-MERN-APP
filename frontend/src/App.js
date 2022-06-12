import './App.css';
import Header from './components/layouts/Header/Header.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layouts/Footer/Footer';
import Home from './components/Home/Home.js';
import { Loader } from './components/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products';
import Search from './components/Product/Search.js'

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
