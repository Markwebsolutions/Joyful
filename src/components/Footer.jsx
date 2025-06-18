import { useState, useCallback } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import arrow from "../assets/footer/arrow.svg"
import insta from "../assets/footer/insta.svg"
import facebook from "../assets/footer/facebook.svg"
import twitter from "../assets/footer/twitter.svg"

// Moved outside component to prevent recreation on each render
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

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    b2b: false,
    productLine: false
  });

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Shared list rendering component
  const renderList = (items) => (
    <ul className="footer-links">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (<>
    <footer className="footer">
      <div className="page-width">
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
                  <img src={arrow} alt="" loading="lazy" />
                </div>
              </form>
            </div>
          </div>

          {/* B2B Options */}
          <div className="footer-section">
            <div
              className="mobile-toggle"
              onClick={() => toggleSection('b2b')}
              role="button"
              tabIndex="0"
              aria-expanded={expandedSections.b2b}
              aria-controls="b2b-mobile-list"
            >
              <h3 className='footer-h1'>B2B Options</h3>
              <span className="toggle-icon">
                {expandedSections.b2b ? '-' : '+'}
              </span>
            </div>

            <div className="desktop-list">
              <h3>B2B Options</h3>
              {renderList(footerLinks.b2b)}
            </div>

            <div 
              id="b2b-mobile-list"
              className={`footer-links mobile-only ${expandedSections.b2b ? 'mobile-show' : ''}`}
            >
              {renderList(footerLinks.b2b)}
            </div>
          </div>

          {/* Product Line */}
          <div className="footer-section">
            <div
              className="mobile-toggle"
              onClick={() => toggleSection('productLine')}
              role="button"
              tabIndex="0"
              aria-expanded={expandedSections.productLine}
              aria-controls="productLine-mobile-list"
            >
              <h3 className='footer-h1'>Product Line</h3>
              <span className="toggle-icon">
                {expandedSections.productLine ? '-' : '+'}
              </span>
            </div>

            <div className="desktop-list">
              <h3 className='footer-h1'>Product Line</h3>
              {renderList(footerLinks.productLine)}
            </div>

            <div 
              id="productLine-mobile-list"
              className={`footer-links mobile-only ${expandedSections.productLine ? 'mobile-show' : ''}`}
            >
              {renderList(footerLinks.productLine)}
            </div>
          </div>

          {/* Contact Us */}
          <div className="footer-section">
            <h3 className='footer-h1'>Contact us</h3>
            <address>
              <span className='footer-h2'>Joyful Plastic Pvt Ltd </span>
              402, 4th floor, Satellite Silver CHS,
              Near Mittal Industrial Estate,
              Andheri Kurla Road, Marol,
              Andheri (East), Mumbai 400059
            </address>
            <li className='contact-li'> Contact Us</li>
          </div>
        </div>
      </div>

      {/* New sections */}
      <div className="sub-footer">
        <div className="sub-footer__container">
          <div className="sub-footer__content">
            <div className="sub-footer__contact">
              <p>
                <span className="sub-footer__label">Call Us:</span>
                <a className="sub-footer__phone" href="tel:+912267402200">+91 22 67402200</a></p>
              <p className="sub-footer__email">info@joyful.co.in</p>
            </div>

            <div className="sub-footer__links">
              <ul className="sub-footer__links-list">
                <li className="sub-footer__link-item">Terms & Conditions</li>
                <li className="sub-footer__link-item">Privacy Policy</li>
              </ul>
            </div>

            <div className="sub-footer__social">
              <p className="sub-footer__social-label">Follow Us
                <img className="sub-footer__social-icon" src={insta} alt="Instagram" loading="lazy" />
                <img className="sub-footer__social-icon" src={facebook} alt="Facebook" loading="lazy" />
                <img className="sub-footer__social-icon" src={twitter} alt="Twitter" loading="lazy" />
              </p>
            </div>
          </div>
        </div>
      </div>  
    </footer>
    <div className="footer-copyright">
      <div className="page-width">
        <div className="copyright-grid">
          <div>
            <p>© Copyright 2023 Joyful Plastics Pvt. Ltd. All Rights Reserved.</p>
          </div>
          <div>
            <p>Design & Development by Mark Web Solutions</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Footer;