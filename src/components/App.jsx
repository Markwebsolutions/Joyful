import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from '../pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
         <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/network" element={<Network />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
          {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;