import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import Header from './Header';
import './App.css';
import ScrollToTop from './ScrollToTop';

// Regular imports for critical routes
import Home from '../pages/Home';
import OurCatlog from '../pages/OurCatlog';
import ProductDetails from '../pages/Productpages/ProductDetails/ProductDetails';
import NewArrival from '../pages/NewArrival';

// Lazy-loaded routes
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Network = lazy(() => import('../pages/Network'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const Footer = lazy(() => import('./Footer'));
const ProductDetailForm = lazy(() => import('../pages/Productpages/ProductDetails/ProductDetailForm'));

// Loading fallback component
const Loading = () => <div className="page-loading">Loading...</div>;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<OurCatlog />} />
            <Route path="/catalog/:productId" element={<ProductDetails />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
            <Route path="/inquiry" element={<Suspense fallback={<Loading />}><ProductDetailForm /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<Loading />}><AboutUs /></Suspense>} />
            <Route path="/network" element={<Suspense fallback={<Loading />}><Network /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<Loading />}><ContactUs /></Suspense>} />
          </Routes>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;