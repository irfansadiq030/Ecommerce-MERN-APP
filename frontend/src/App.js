import './App.css';
import Header from './components/layouts/Header/Header.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layouts/Footer/Footer';
import Home from './components/Home/Home.js';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
