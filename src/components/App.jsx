import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css';
import Home from '../pages/Home';
import Footer from './Footer';
import ProductDetails from '../pages/catlogpage/ProductDetails';
import AboutUs from '../pages/AboutUs';
import Network from '../pages/Network';
import ContactUs from '../pages/ContactUs';
import Product from '../pages/Product';
function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/catalog" element={<ProductDetails />} />
            <Route path="/new-arrivals" element={<Product />} />
            <Route path="/network" element={<Network />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;