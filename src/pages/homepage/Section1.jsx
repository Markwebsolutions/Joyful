import Section1_1 from "../../assets/Section1/Section1_1.jpg";
import upper from "../../assets/Section1/Section1_2.jpg";
import "./Section.css"
import flag from "../../assets/Section1/flag.svg"
import feature from "../../assets/Section1/feature.svg"
import gift from "../../assets/Section1/gift.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const Section1 = () => {
  return (
    <div className="section1-container">
      <div className="image-container-section1">
        <img
          src={Section1_1}
          alt="Joyful Plastics products"
          className="section-image"
        />
        <div className="upper-img">
          <img src={upper} alt="" className="upper-img" />
        </div>
      </div>
      <div className="text-container">
        <div className="tagline">#1 manufacturer and seller of</div>
        <h1 className="section-title">Welcome to<br /><strong>Joyful Plastics.</strong></h1>
        <p className="section-description">
          We at Joyful believe that happiness lies in little things. Right from powder puff containers to pencil boxes to multi-purpose drawers to salt and pepper shakers. Each of these little things play a critical role in our lives.
        </p>

        <div className="feature">
          <div className="feature-child">
            <img src={feature} alt="" className="feature-img" /><p className="feature-text">Unique Innovative <span>& Durable roducts</span></p></div>
          <div className="feature-child">
            <img src={flag} alt="" className="feature-img" /><p className="feature-text">Made In India <span>since 1995</span></p></div>
        </div>

        <div className="gift-section">
          <p className="gift-text"><img src={gift} alt="" className="gift-img" /> Joyful Plastics is a 21 year old legacy established in 1995</p>
          <p className="gift-text"> <img src={gift} alt="" className="gift-img" />Annual production capacity of over 2000 tonnes</p>
        </div>

        <div className="action-container">
          <button className="section-button">Send Inquiry
            <FontAwesomeIcon icon={faArrowRight} className="button-icon arrow" /></button>
          <div className="call-container">
            CALL US NOW:<br />
            <a href="tel:+912267402200" className="call-link">+91 22 67402200</a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Section1;