import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import AboutUsbg from "../../assets/AboutUs/AboutUsbg.jpg";
import ClickSpark from '../../style/ClickSpark';

const AboutUs1 = () => {
  return (
    <div className="aboutUsContainer" style={{ backgroundImage: `url(${AboutUsbg})` }}>
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div className="navigation">
            <span>Home</span>
            <FontAwesomeIcon icon={faCaretRight} />
            <span>About us</span>
          </div>

          <h1 className="aboutUsTitle">About us</h1>
        </div>
      </ClickSpark>
    </div>
  );
}

export default AboutUs1;