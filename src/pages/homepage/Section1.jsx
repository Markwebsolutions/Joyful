import Section1_1 from "../../assets/Section1/Section1_1.jpg";
import "./Section.css"

const Section1 = () => {
  return (
    <div className="section1-container">
      <div className="image-container-section1">
        <img 
          src={Section1_1} 
          alt="Joyful Plastics products" 
          className="section-image"
        />
      </div>
      <div className="text-container">
        <div className="tagline">#1 manufacturer and seller of</div>
        <h1 className="section-title">Welcome to<br/>Joyful Plastics.</h1>
        <p className="section-description">
          We at Joyful believe that happiness lies in little things. Right from powder puff containers to pencil boxes to multi-purpose drawers to salt and pepper shakers. Each of these little things play a critical role in our lives.
        </p>
        
        <div className="highlight-box">
          <h3>Unique Innovative & Durable Products</h3>
          <div className="highlight-item">Made In India since 1995</div>
        </div>
        
        <ul className="features-list">
          <li>Joyful Plastics is a 21 year old legacy established in 1995</li>
          <li>Annual production capacity of over 2000 tonnes</li>
        </ul>
        
        <div className="action-container">
          <button className="section-button">Send Inquiry →</button>
          <div className="call-container">
            CALL US NOW:<br/>
            <a href="tel:+912267402200" className="call-link">+91 22 67402200</a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Section1;