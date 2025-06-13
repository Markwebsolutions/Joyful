import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import arrow from "../assets/footer/arrow.svg"

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    b2b: false,
    productLine: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const footerLinks = {
    b2b: [
      'Become a wholesaler',
      'Find A wholesaler',
      'Wholesaler benefit',
      'After-Sales Protections',
      'Products Monitoring Series'
    ],
    productLine: [
      'Baby Care',
      'Schoolware',
      'Home Furniture',
      'Kitchenware',
      'Restaurant Trays',
      'Multipurpose Items'
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Newsletter Section */}
          <div className="footer-wrapper">
            <div className="glass">
              <h3>Stay In The Loop!</h3>
              <p>News, Updates, Offers & Releases</p>
              <form className="newsletter-form">
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address for newsletter"
                  />
                    <img src={arrow} alt="" />
                   </div>
              </form>
            </div>
          </div>

          {/* B2B Options */}
          <div className="footer-section">
            {/* Mobile Toggle (only shown on mobile) */}
            <div
              className="mobile-toggle"
              onClick={() => toggleSection('b2b')}
              role="button"
              tabIndex="0"
              aria-expanded={expandedSections.b2b}
            >
              <h3 className='footer-h1'>B2B Options</h3>
              <span className="toggle-icon">
                {expandedSections.b2b ? '-' : '+'}
              </span>
            </div>

            {/* Desktop List (always visible on desktop) */}
            <div className="desktop-list">
              <h3>B2B Options</h3>
              <ul className="footer-links">
                {footerLinks.b2b.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Mobile List (only shown when expanded) */}
            <ul className={`footer-links mobile-only ${expandedSections.b2b ? 'mobile-show' : ''}`}>
              {footerLinks.b2b.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Product Line */}
          <div className="footer-section">
            {/* Mobile Toggle (only shown on mobile) */}
            <div
              className="mobile-toggle"
              onClick={() => toggleSection('productLine')}
              role="button"
              tabIndex="0"
              aria-expanded={expandedSections.productLine}
            >
              <h3 className='footer-h1'>Product Line</h3>
              <span className="toggle-icon">
                {expandedSections.productLine ? '-' : '+'}
              </span>
            </div>

            {/* Desktop List (always visible on desktop) */}
            <div className="desktop-list">
              <h3 className='footer-h1'>Product Line</h3>
              <ul className="footer-links">
                {footerLinks.productLine.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Mobile List (only shown when expanded) */}
            <ul className={`footer-links mobile-only ${expandedSections.productLine ? 'mobile-show' : ''}`}>
              {footerLinks.productLine.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-section">
            <h3 className='footer-h1'>Contact us</h3>
            <address>
              <span className='footer-h2'>Joyful Plastic Pvt Ltd </span>
              402, 4th floor, Satellite Silver CHS,<br />
              Near Mittal Industrial Estate,<br />
              Andheri Kurla Road, Marol,<br />
              Andheri (East), Mumbai 400059
            </address>
            <li className='contact-li'> Contact Us</li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;