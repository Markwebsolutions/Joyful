import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const AboutUs1 = () => {
  return (
    <div className="aboutUsContainer">
      <div className="navigation">
        <span>Home</span>
        <FontAwesomeIcon icon={faCaretRight} />
        <span>About us</span>
      </div>

      <h1 className="aboutUsTitle">About us</h1>
    </div>
  );
}

export default AboutUs1;