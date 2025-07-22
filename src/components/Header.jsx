import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRight,
  faBars,
  faTimes,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/joyful.png";
import "./Header.css";

const NAV_LINKS = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About Us" },
  { path: "/catalog", text: "Our Catalog" },
  { path: "/new-arrivals", text: "New Arrivals" },
  { path: "/network", text: "Network" },
  { path: "/contact", text: "Contact Us" }
];

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isHomePage = pathname === "/";

  const [searchResults, setSearchResults] = useState([]);
  const products = useSelector(state => state.products.data);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (isSearchOpen) {
      setSearchQuery("");
      // Show popular products when opening search
      const popularProducts = products.slice(0, 5);
      setSearchResults(popularProducts);
    } else {
      setSearchResults([]);
    }
  }, [isSearchOpen, products]);
  const handleInquiryClick = useCallback(() => {
    navigate("/contact#contact-form");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
    setIsSearchOpen(true);
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      if (isSearchOpen) {
        const popularProducts = products.slice(0, 5); // Show first 5 products
        setSearchResults(popularProducts);
      } else {
        setSearchResults([]);
      }
      return;
    }

    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.searchkeywords?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    setSearchResults(results);
  }, [searchQuery, products, isSearchOpen]);

  const handleProductClick = (productId) => {
    navigate(`/catalog/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const renderNavLinks = useMemo(() => (
    NAV_LINKS.map(({ path, text }) => (
      <Link
        key={path}
        to={path}
        className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}
        onClick={closeMenu}
      >
        {text}
      </Link>
    ))
  ), [isHomePage, closeMenu]);

  const headerStyle = !isHomePage ? { backgroundColor: '#f5edda' } : {};
  const mobileHeaderStyle = { backgroundColor: isHomePage ? 'transparent' : '#f5edda' };
  const mobileMenuStyle = { backgroundColor: isHomePage ? '#274D63' : '#f5edda' };

  const iconButtonClass = isHomePage ? 'light' : 'dark';
  const linkColor = isHomePage ? 'white' : '#1f2937';
  const borderColor = isHomePage ? 'rgba(255, 255, 255, 0.3)' : 'rgba(31, 41, 55, 0.3)';
  const searchInputBg = isHomePage ? 'rgba(255, 255, 255, 0.18)' : 'rgba(31, 41, 55, 0.1)';
  const searchInputColor = isHomePage ? 'white' : '#1f2937';

  return (
    <header className="header" style={headerStyle}>
      {/* Desktop Header - hidden on mobile */}
      <div className="desktop-header">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>

        <nav className="header-nav">
          {renderNavLinks}
        </nav>

        <div className="header-actions">
          <div className="search-container">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchQuery.trim() === "") {
                      const popularProducts = products.slice(0, 5);
                      setSearchResults(popularProducts);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (searchQuery.trim() === "") {
                        setSearchResults([]);
                      }
                    }, 200);
                  }}
                  placeholder="Search for products..."
                  className="search-input"
                  style={{
                    backgroundColor: searchInputBg,
                    color: searchInputColor,
                    borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : '#e1e1e1'
                  }}
                  autoFocus
                />
                <button type="submit" className="search-icon-container">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="icon"
                    style={{ color: isHomePage ? 'white' : '#6b7280' }}
                  />
                </button>
                {searchResults.length > 0 && (
                  <div className="search-results-dropdown">
                    {searchResults.map(product => (
                      <div
                        key={product.id}
                        className="search-result-item"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <img
                          src={product.mainimage || product.imagelink}
                          alt={product.name}
                          className="search-result-image"
                        />
                        <span className="search-result-name">{product.name}</span>
                        {product.price && (
                          <span className="search-result-price">₹{product.price}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <button className={`icon-button ${iconButtonClass}`} onClick={toggleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              </button>
            )}
          </div>
          <button className="primary-button" onClick={handleInquiryClick}>
            Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Header - hidden on desktop */}
      <div className="mobile-header" style={mobileHeaderStyle}>
        <div className="mobile-header-container">
          <div className="mobile-hamburger">
            <button className={`icon-button ${iconButtonClass}`} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="icon" />
            </button>
          </div>

          <div className="mobile-logo">
            <Link to="/">
              <img src={Logo} alt="Company Logo" className="logo-image" />
            </Link>
          </div>

          <div className="mobile-search">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="mobile-search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchQuery.trim() === "") {
                      const popularProducts = products.slice(0, 5);
                      setSearchResults(popularProducts);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (searchQuery.trim() === "") {
                        setSearchResults([]);
                      }
                    }, 200);
                  }}
                  placeholder="Search for products..."
                  className="mobile-search-input"
                  style={{
                    backgroundColor: searchInputBg,
                    color: searchInputColor,
                    borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : '#e1e1e1'
                  }}
                  autoFocus
                />
                <button type="submit" className="search-icon-container">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="icon"
                    style={{ color: isHomePage ? 'white' : '#6b7280' }}
                  />
                </button>
                {searchResults.length > 0 && (
                  <div className="mobile-search-results-dropdown">
                    {searchResults.map(product => (
                      <div
                        key={product.id}
                        className="search-result-item"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <img
                          src={product.mainimage || product.imagelink}
                          alt={product.name}
                          className="search-result-image"
                        />
                        <span className="search-result-name">{product.name}</span>
                        {product.price && (
                          <span className="search-result-price">₹{product.price}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <button className={`icon-button ${iconButtonClass}`} onClick={toggleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" style={mobileMenuStyle}>
          <nav className="mobile-nav">
            {NAV_LINKS.map(({ path, text }) => (
              <Link
                key={path}
                to={path}
                className="mobile-nav-link"
                style={{
                  color: linkColor,
                  borderBottom: `1px solid ${borderColor}`
                }}
                onClick={closeMenu}
              >
                <span className="mobile-nav-link-text">{text}</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="mobile-nav-link-arrow"
                  style={{ color: linkColor }}
                />
              </Link>
            ))}
            <div className="mobile-button-container">
              <button className="primary-button" onClick={handleInquiryClick}>
                Send Inquiry
                <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;