import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './Header';
import './App.css';
import Footer from './Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';

// Regular imports for routes you don't want to lazy load
import OurCatlog from '../pages/OURcATLOG';
import ProductDetails from '../pages/Productpages/ProductDetails/ProductDetails';
import NewArrival from '../pages/NewArrival';

// Lazy load all other components
const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Network = lazy(() => import('../pages/Network'));
const ContactUs = lazy(() => import('../pages/ContactUs'));

// Loading component for Suspense fallback
const Loading = () => <div className="page-loading">Loading...</div>;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Lazy loaded routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/network" element={<Network />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Regular routes (not lazy loaded) */}
              <Route path="/catalog" element={<OurCatlog />} />
              <Route path="/catalog/:productId" element={<ProductDetails />} />
              <Route path="/new-arrivals" element={<NewArrival />} />
            </Routes>
          </Suspense>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;