import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './Header';
import './App.css';
import Footer from './Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';

// Regular imports for routes you want to load quickly
import Home from '../pages/Home';  // Now regularly imported
import OurCatlog from '../pages/OURcATLOG';
import ProductDetails from '../pages/Productpages/ProductDetails/ProductDetails';
import NewArrival from '../pages/NewArrival';
import ScrollToTop from './ScrollToTop';

// Lazy load other components
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
          <Routes>
            {/* Non-lazy routes */}
            <Route path="/" element={<Home />} />

            {/* Lazy loaded routes wrapped in Suspense */}
            <Route path="/about" element={
              <Suspense fallback={<Loading />}>
                <AboutUs />
              </Suspense>
            } />
            <Route path="/network" element={
              <Suspense fallback={<Loading />}>
                <Network />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<Loading />}>
                <ContactUs />
              </Suspense>
            } />

            {/* Other regular routes */}
            <Route path="/catalog" element={<OurCatlog />} />
            <Route path="/catalog/:productId" element={<ProductDetails />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
          </Routes>
          <Footer />
          <ScrollToTop threshold={1.2} />
        </main>
      </div>
    </Router>
  );
}

export default App;