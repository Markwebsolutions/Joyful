import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css';
import Home from '../pages/Home';
import Footer from './Footer';
function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/network" element={<Network />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
          <Footer/>
        </main>
      </div>
    </Router>
  );
}

export default App;