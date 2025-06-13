import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/joyful.png";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import EnquiryModal from "./Enquiry";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const textColorClass = isHomePage ? "text-white" : "text-dark";
  const iconColorClass = isHomePage ? 'light' : 'dark';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navLinks = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About Us" },
    { path: "/catalog", text: "Our Catalog" },
    { path: "/new-arrivals", text: "New Arrivals" },
    { path: "/network", text: "Network" },
    { path: "/contact", text: "Contact Us" }
  ];

  return (
    <header className={`header ${isHomePage ? "header-transparent" : "header-colored"}`}>
      {/* Desktop Header */}
      <div className="desktop-header">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>

        <nav className="header-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${textColorClass}`}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className={`icon-button ${iconColorClass}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </button>
          <button className="primary-button" onClick={openModal}>
            Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-hamburger">
          <button onClick={toggleMenu} className={`icon-button ${iconColorClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="mobile-logo">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>

        <div className="mobile-search">
          <button className={`icon-button ${iconColorClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isHomePage ? "mobile-menu-transparent" : "mobile-menu-colored"} ${isMenuOpen ? "open" : "closed"}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`mobile-nav-link ${textColorClass}`}
            >
              {link.text}
            </Link>
          ))}
          <div className="mobile-button-container">
            <button className="primary-button" onClick={() => { openModal(); closeMenu(); }}>
              Send Inquiry <span className="button-icon">&gt;</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}

export default Header;