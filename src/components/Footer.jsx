import { useState, useCallback } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import arrow from "../assets/footer/arrow.svg";
import insta from "../assets/footer/insta.svg";
import facebook from "../assets/footer/facebook.svg";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
const twitterUrl = import.meta.env.VITE_TWITTER_URL;
const contactNumber = import.meta.env.VITE_CONTACT_NUMBER;
const contactLink = import.meta.env.VITE_CONTACT_LINK;
const markweb = "https://www.markweb.in/";
const joyfulp = "https://joyful-ui-production.up.railway.app/";
const footerLinks = {
  b2b: [
    "Become a wholesaler",
    "Find A wholesaler",
    "Wholesaler benefit",
    "After-Sales Protections",
    "Products Monitoring Series",
  ],
  productLine: [
    "Baby Care",
    "Schoolware",
    "Home Furniture",
    "Kitchenware",
    "Restaurant Trays",
    "Multipurpose Items",
  ],
};

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    b2b: false,
    productLine: false,
  });
  const [email, setEmail] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const slugify = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubmissionStatus("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const requestBody = {
        email: email,
      };

      const response = await fetch(
        "https://joyfulbackend-production.up.railway.app/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setSubmissionStatus(data.message || "Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setSubmissionStatus(
        error.message || "Failed to subscribe. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderList = (items, isProductLine = false) => (
    <ul className="footer-links">
      {items.map((item, index) => (
        <li key={index}>
          {isProductLine ? (
            <Link to={`/catalog/${slugify(item)}`}>{item}</Link>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <footer className="footer">
        <div className="page-width">
          <div className="footer-grid">
            <div className="footer-wrapper">
              <div className="glass">
                <h3>Stay In The Loop!</h3>
                <p>News, Updates, Offers & Releases</p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    <input
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address for newsletter"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" disabled={isLoading}>
                      <img src={arrow} alt="Submit" loading="lazy" />
                    </button>
                  </div>
                  {submissionStatus && (
                    <p
                      className={`submission-status ${
                        submissionStatus.includes("Thank you")
                          ? "success"
                          : "error"
                      }`}
                    >
                      {submissionStatus}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="footer-section">
              <div
                className="mobile-toggle"
                onClick={() => toggleSection("b2b")}
                role="button"
                tabIndex="0"
                aria-expanded={expandedSections.b2b}
                aria-controls="b2b-mobile-list"
              >
                <h3 className="footer-h1">B2B Options</h3>
                <span className="toggle-icon">
                  {expandedSections.b2b ? "-" : "+"}
                </span>
              </div>

              <div className="desktop-list">
                <h3>B2B Options</h3>
                {renderList(footerLinks.b2b)}
              </div>

              <div
                id="b2b-mobile-list"
                className={`footer-links mobile-list ${
                  expandedSections.b2b ? "expanded" : ""
                }`}
              >
                {renderList(footerLinks.b2b)}
              </div>
            </div>

            <div className="footer-section">
              <div
                className="mobile-toggle"
                onClick={() => toggleSection("productLine")}
                role="button"
                tabIndex="0"
                aria-expanded={expandedSections.productLine}
                aria-controls="productLine-mobile-list"
              >
                <h3 className="footer-h1">Product Line</h3>
                <span className="toggle-icon">
                  {expandedSections.productLine ? "-" : "+"}
                </span>
              </div>

              <div className="desktop-list">
                <h3 className="footer-h1">Product Line</h3>
                {renderList(footerLinks.productLine , true)}
              </div>

              <div
                id="productLine-mobile-list"
                className={`footer-links mobile-list ${
                  expandedSections.productLine ? "expanded" : ""
                }`}
              >
                {renderList(footerLinks.productLine , true)}
              </div>
            </div>

            <div className="footer-section">
              <h3 className="footer-h1">Contact us</h3>
              <address>
                <span className="footer-h2">Joyful Plastic Pvt Ltd </span>
                402, 4th floor, Satellite Silver CHS, Near Mittal Industrial
                Estate, Andheri Kurla Road, Marol, Andheri (East), Mumbai 400059
              </address>
            </div>
          </div>
        </div>

        <div className="sub-footer">
          <div className="sub-footer__container">
            <div className="sub-footer__content">
              <div className="sub-footer__contact">
                <p>
                  <span className="sub-footer__label">Call Us:</span>
                  <a className="sub-footer__phone" href={contactLink}>
                    {contactNumber}
                  </a>
                </p>
                <p className="sub-footer__email">
                  <a href="mailto:info@joyful.co.in">info@joyful.co.in</a>
                </p>
              </div>

              <div className="sub-footer__links">
                <ul className="sub-footer__links-list">
                  <li className="sub-footer__link-item">Terms & Conditions</li>
                  <li className="sub-footer__link-item">Privacy Policy</li>
                </ul>
              </div>

              <div className="sub-footer__social">
                <p className="sub-footer__social-label">
                  Follow Us
                  <a href={instagramUrl}>
                    <img
                      className="sub-footer__social-icon"
                      src={insta}
                      alt="Instagram"
                      loading="lazy"
                    />
                  </a>
                  <a href={facebookUrl}>
                    <img
                      className="sub-footer__social-icon"
                      src={facebook}
                      alt="Facebook"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href={twitterUrl}
                    aria-label="X (formerly Twitter)"
                    className="sub-footer__social-icon"
                  >
                    <FaXTwitter size={25} />
                  </a>
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
              <p>
                <a href={joyfulp} rel="noopener noreferrer">
                  © Copyright 2025 Joyful Plastics Pvt. Ltd. All Rights
                  Reserved.
                </a>
              </p>
            </div>
            <div>
              <p>
                Design & Development by &nbsp;
                <a href={markweb} target="_blank" rel="noopener noreferrer">
                  Mark Web Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
