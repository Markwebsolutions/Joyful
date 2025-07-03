import { useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isHomePage = pathname === "/";
  const textColorClass = isHomePage ? "text-white" : "text-dark";
  const iconColorClass = isHomePage ? 'light' : 'dark';
  const headerClass = isHomePage ? "header-transparent" : "header-colored";
  const mobileMenuClass = isHomePage ? "mobile-menu-transparent" : "mobile-menu-colored";

  const handleInquiryClick = useCallback(() => {
    navigate("/contact#contact-form");
    setIsMenuOpen(false);
  }, [navigate]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  const renderNavLinks = useMemo(() =>
    NAV_LINKS.map(({ path, text }) => (
      <Link
        key={path}
        to={path}
        className={`nav-link ${textColorClass} ${isMenuOpen ? 'mobile-nav-link' : ''}`}
        onClick={closeMenu}
      >
        <span className="nav-text">{text}</span>
        {/* {isMenuOpen && <span className="nav-arrow">&gt;</span>} */}
      </Link>
    )), [textColorClass, closeMenu, isMenuOpen]);

  const sendInquiryButton = (
    <button className="primary-button" onClick={handleInquiryClick}>
      Send Inquiry
      <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
    </button>
  );

  const renderIconButton = (icon, label, onClick) => (
    <button
      className={`icon-button ${iconColorClass}`}
      aria-label={label}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="icon" />
    </button>
  );

  return (
    <header className={`header ${headerClass}`}>
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
          {renderIconButton(faMagnifyingGlass, "Search")}
          {sendInquiryButton}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-hamburger">
          {renderIconButton(isMenuOpen ? faTimes : faBars, "Menu", toggleMenu)}
        </div>

        <div className="mobile-logo">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>

        <div className="mobile-search">
          {renderIconButton(faMagnifyingGlass, "Search")}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`mobile-menu ${mobileMenuClass} open`}>
          <nav className="mobile-nav">
            {renderNavLinks}
            <div className="mobile-button-container">
              {sendInquiryButton}
            </div>
          </nav>
        </div>
      )}

      {/* Contact Form Overlay */}
      {isFormOpen && (
        <div className="form-overlay">
          <div className="form-container">
            {renderIconButton(faTimes, "Close form", closeForm)}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;