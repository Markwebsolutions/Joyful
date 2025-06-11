import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/joyful.png";
import "./Header.css"; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isHomePage ? "header-transparent" : "header-colored"}`}>
      {/* Desktop Header - 3-column grid */}
      <div className="desktop-header">

        {/* Column 1 - Logo (left) */}
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>

        {/* Column 2 - Navigation Links (center) */}
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            About Us
          </Link>
          <Link
            to="/catalog"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Our Catalog
          </Link>
          <Link
            to="/new-arrivals"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            New Arrivals
          </Link>
          <Link
            to="/network"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Network
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Column 3 - Search and Inquiry (right) */}
        <div className="header-actions">
          <button className="search-button">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`search-icon ${isHomePage ? "" : ""}`}
            />
          </button>
          <button className="inquiry-button">
            Send Inquiry
            <FontAwesomeIcon
              icon={faArrowRight}
              className="inquiry-arrow"
            />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        {/* Column 1 - Hamburger (left) */}
        <div className="mobile-hamburger">
          <button
            onClick={handleMenuToggle}
            className="hamburger-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hamburger-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Column 2 - Logo (center) */}
        <div className="mobile-logo">
          <Link to="/" className="mobile-logo-link">
            <img src={Logo} alt="Company Logo" className="mobile-logo-image" />
          </Link>
        </div>

        {/* Column 3 - Search (right) */}
        <div className="mobile-search">
          <button className="mobile-search-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="mobile-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-menu ${isHomePage ? "mobile-menu-transparent" : "mobile-menu-colored"} ${isMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"}`}
      >
        <nav className="mobile-nav">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            About Us
          </Link>
          <Link
            to="/catalog"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Our Catalog
          </Link>
          <Link
            to="/new-arrivals"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            New Arrivals
          </Link>
          <Link
            to="/network"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Network
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${isHomePage ? "text-white" : "text-dark"}`}
          >
            Contact Us
          </Link>
          <div className="mobile-inquiry-container">
            <button className="mobile-inquiry-button">
              Send Inquiry <span className="mobile-inquiry-arrow">&gt;</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;