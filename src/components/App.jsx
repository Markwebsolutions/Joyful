import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import './App.css';
import Footer from './Footer';
import { fetchProducts } from '../features/productsSlice';
import ScrollToTop from './ScrollToTop';

// Regular imports for critical routes
import Home from '../pages/Home';
import OurCatlog from '../pages/OURcATLOG';
import ProductDetails from '../pages/Productpages/ProductDetails/ProductDetails';
import NewArrival from '../pages/NewArrival';
import ProductDetailForm from '../pages/Productpages/ProductDetails/ProductDetailForm';

// Lazy-loaded components
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Network = lazy(() => import('../pages/Network'));
const ContactUs = lazy(() => import('../pages/ContactUs'));

// Loading fallback component
const Loading = () => <div className="page-loading">Loading...</div>;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<OurCatlog />} />
            <Route path="/catalog/:productId" element={<ProductDetails />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
            <Route path="/inquiry" element={<ProductDetailForm />} />

            {/* Lazy-loaded routes */}
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loading />}>
                  <AboutUs />
                </Suspense>
              }
            />
            <Route
              path="/network"
              element={
                <Suspense fallback={<Loading />}>
                  <Network />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Loading />}>
                  <ContactUs />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;