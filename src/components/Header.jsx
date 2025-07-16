import { useState, useMemo, useCallback } from "react";
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
  const isHomePage = pathname === "/";

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const handleInquiryClick = useCallback(() => {
    navigate("/contact#contact-form");
    closeMenu();
  }, [navigate, closeMenu]);

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
          <button className={`icon-button ${iconButtonClass}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </button>
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
            <button className={`icon-button ${iconButtonClass}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            </button>
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