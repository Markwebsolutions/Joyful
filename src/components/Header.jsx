import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBars,
  faTimes,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/joyful.png";
import Search from "./Search";
import "./Header.css";

const NAV_LINKS = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About Us" },
  { path: "/catalog", text: "Our Catalog", hasDropdown: true },
  { path: "/new-arrivals", text: "New Arrivals" },
  { path: "/network", text: "Network" },
  { path: "/contact", text: "Contact Us" }
];

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogHovered, setIsCatalogHovered] = useState(false);
  const isHomePage = pathname === "/";
  const catalogDropdownRef = useRef(null);
  const catalogHoverTimerRef = useRef(null);

  const products = useSelector(state => state.products.data);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleInquiryClick = useCallback(() => {
    navigate("/contact#contact-form");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleCatalogEnter = () => {
    clearTimeout(catalogHoverTimerRef.current);
    setIsCatalogHovered(true);
  };

  const handleCatalogLeave = () => {
    catalogHoverTimerRef.current = setTimeout(() => {
      setIsCatalogHovered(false);
    }, 300);
  };

  const handleDropdownEnter = () => {
    clearTimeout(catalogHoverTimerRef.current);
    setIsCatalogHovered(true);
  };

  const handleDropdownLeave = () => {
    catalogHoverTimerRef.current = setTimeout(() => {
      setIsCatalogHovered(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(catalogHoverTimerRef.current);
    };
  }, []);

  const renderCatalogDropdown = () => (
    <div
      className="catalog-dropdown"
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
    >
      <div className="subcategories-grid-header">
        {products
          .filter(category => category.subcategories && category.subcategories.length > 0)
          .map(category => (
            <Link
              key={category.id}
              to={`/catalog/${category.id}`}
              className="subcategory-item-header"
              onClick={() => {
                closeMenu();
                setIsCatalogHovered(false);
              }}
            >
              <div className="subcategory-image-header">
                <img
                  src={category.imagelink || 'https://via.placeholder.com/80'}
                  alt={category.name}
                  className="subcategory-image"
                />
              </div>
              <span className="subcategory-name-header">{category.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );

  const renderNavLinks = useMemo(() => (
    NAV_LINKS.map(({ path, text, hasDropdown }) => (
      <div
        key={path}
        className={`nav-link-container ${hasDropdown ? 'has-dropdown' : ''}`}
        onMouseEnter={hasDropdown ? handleCatalogEnter : undefined}
        onMouseLeave={hasDropdown ? handleCatalogLeave : undefined}
        ref={hasDropdown ? catalogDropdownRef : null}
      >
        <Link
          to={path}
          className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}
          onClick={closeMenu}
        >
          {text}
        </Link>

        {hasDropdown && isCatalogHovered && renderCatalogDropdown()}
      </div>
    ))
  ), [isHomePage, closeMenu, products, isCatalogHovered]);

  const headerStyle = !isHomePage ? { backgroundColor: '#f5edda' } : {};
  const mobileHeaderStyle = { backgroundColor: isHomePage ? 'transparent' : '#f5edda' };
  const mobileMenuStyle = { backgroundColor: isHomePage ? '#274D63' : '#f5edda' };

  const iconButtonClass = isHomePage ? 'light' : 'dark';
  const linkColor = isHomePage ? 'white' : '#1f2937';
  const borderColor = isHomePage ? 'rgba(255, 255, 255, 0.3)' : 'rgba(31, 41, 55, 0.3)';

  return (
    <header className="header" style={headerStyle}>
      {/* Desktop Header */}
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
          <Search isHomePage={isHomePage} />
          <button className="primary-button" onClick={handleInquiryClick}>
            Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
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
            <Search isHomePage={isHomePage} isMobile={true} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" style={mobileMenuStyle}>
          <nav className="mobile-nav">
            {NAV_LINKS.map(({ path, text, hasDropdown }) => (
              <div key={path}>
                <Link
                  to={path}
                  className="mobile-nav-link"
                  style={{
                    color: linkColor,
                    borderBottom: `1px solid ${borderColor}`
                  }}
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-link-text">{text}</span>
                  {hasDropdown && (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mobile-nav-link-arrow"
                      style={{ color: linkColor }}
                    />
                  )}
                </Link>
                {hasDropdown && (
                  <div className="mobile-subcategories">
                    <div className="subcategories-grid-header">
                      {products
                        .filter(category => category.subcategories && category.subcategories.length > 0)
                        .map(category => (
                          <Link
                            key={category.id}
                            to={`/catalog/${category.id}`}
                            className="subcategory-item-header"
                            onClick={closeMenu}
                          >
                            <div className="subcategory-image-header">
                              <img
                                src={category.imagelink || 'https://via.placeholder.com/60'}
                                alt={category.name}
                                className="subcategory-image"
                              />
                            </div>
                            <span className="subcategory-name-header">{category.name}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
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