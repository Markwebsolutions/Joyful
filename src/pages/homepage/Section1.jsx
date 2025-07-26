import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SectionImage from "../../assets/Section1/Group.png";
import phoneIcon from "../../assets/Section1/phone.svg";
import flagIcon from "../../assets/Section1/flag.svg";
import featureIcon from "../../assets/Section1/feature.svg";
import giftIcon from "../../assets/Section1/gift.svg";
import "./Section.css";

const Section1 = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation classes when section comes into view
            if (imageRef.current) {
              imageRef.current.classList.add('animate-from-left');
            }
            if (contentRef.current) {
              contentRef.current.classList.add('animate-from-right');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInquiryClick = () => {
    navigate("/contact#contact-form");
  };

  return (
    <div className="section-container" ref={sectionRef}>
      <div className="section-image" ref={imageRef}>
        <img
          src={SectionImage}
          alt="Joyful Plastics products"
          className="section-main-img"
          loading="lazy"
        />
      </div>

      <div className="section-content" ref={contentRef}>
        <div className="section-tagline">#1 manufacturer and seller of</div>
        <h1 className="section-title">
          Welcome to<br /><strong>Joyful Plastics.</strong>
        </h1>

        <p className="section-text">
          We at Joyful believe that happiness lies in little things. Right from powder puff containers to pencil boxes to multi-purpose drawers to salt and pepper shakers. Each of these little things play a critical role in our lives.
        </p>

        <div className="features">
          <div className="feature-item">
            <img src={featureIcon} alt="Feature icon" className="feature-icon" />
            <p>Unique Innovative <span>& Durable products</span></p>
          </div>
          <div className="feature-item">
            <img src={flagIcon} alt="Flag icon" className="feature-icon" />
            <div className="floating-circle"></div>
            <p>Made In India <span>since 1995</span></p>
          </div>
        </div>

        <div className="benefits">
          <p className="benefit-item">
            <img src={giftIcon} alt="Gift icon" className="benefit-icon" />
            Joyful Plastics is a 21 year old legacy established in 1995
          </p>
          <p className="benefit-item">
            <img src={giftIcon} alt="Gift icon" className="benefit-icon" />
            <div className="floating-circle"></div>
            Annual production capacity of over 2000 tonnes
          </p>
        </div>

        <div className="action-buttons">
          <button
            className="dark-button"
            onClick={handleInquiryClick}
            aria-label="Send Inquiry"
          >
            Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </button>

          <div className="contact-info">
            <img src={phoneIcon} alt="Phone icon" className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">CALL US NOW:</span>
              <a href="tel:+912267402200" className="contact-number">+91 22 67402200</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Section1);