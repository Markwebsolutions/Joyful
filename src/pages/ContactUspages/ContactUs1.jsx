import '../AboutUspages/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ContactUsbg from "../../assets/ContactUs/ContactUsbanner.jpg"

const ContactUs1 = () => {

    return (
        <div>

            <div className="aboutUsContainer" style={{ backgroundImage: `url(${ContactUsbg})` }}>
                <div className="navigation">
                    <span>Home</span>
                    <FontAwesomeIcon icon={faCaretRight} />
                    <span>Contact Us</span>
                </div>
                <h1 className="aboutUsTitle">Contact Us</h1>
            </div>
        </div>
    )
}

export default ContactUs1;


