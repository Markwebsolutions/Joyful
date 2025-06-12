import Section from "../../assets/Section1/Group.png";
import phone from "../../assets/Section1/phone.svg";
import "./Section.css";
import flag from "../../assets/Section1/flag.svg";
import feature from "../../assets/Section1/feature.svg";
import gift from "../../assets/Section1/gift.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Section1 = () => {
  return (
    <div className="section-container">
      <div className="section-image">
        <img src={Section} alt="Joyful Plastics products" className="section-main-img" />
      </div>
      <div className="section-content">
        <div className="section-tagline">#1 manufacturer and seller of</div>
        <h1 className="section-title">Welcome to<br /><strong>Joyful Plastics.</strong></h1>
        <p className="section-text">
          We at Joyful believe that happiness lies in little things. Right from powder puff containers to pencil boxes to multi-purpose drawers to salt and pepper shakers. Each of these little things play a critical role in our lives.
        </p>

        <div className="features">
          <div className="feature-item">
            <img src={feature} alt="Feature icon" className="feature-icon" />
            <p>Unique Innovative <span>& Durable products</span></p>
          </div>
          <div className="feature-item">
            <img src={flag} alt="Flag icon" className="feature-icon" />
            <p>Made In India <span>since 1995</span></p>
          </div>
        </div>

        <div className="benefits">
          <p className="benefit-item">
            <img src={gift} alt="Gift icon" className="benefit-icon" />
            Joyful Plastics is a 21 year old legacy established in 1995
          </p>
          <p className="benefit-item">
            <img src={gift} alt="Gift icon" className="benefit-icon" />
            Annual production capacity of over 2000 tonnes
          </p>
        </div>

        <div className="action-buttons">
          <button className="action-dark-button">
            Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
          <div className="contact-info">
            <img src={phone} alt="Phone icon" className="contact-icon" />
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

export default Section1;
