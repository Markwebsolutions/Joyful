import './ContactUs.css';
import location from "../../assets/ContactUs/location.svg";
// import factory from "../../assets/AboutUs/AboutUs_1.jpg";
import factory from "../../assets/ContactUs/factory.jpg";

const ContactUs3 = () => {
    return (
        <div className="contact3Container">
            <div className="contact3Wrapper">
                <div className="contact3Grids">
                    {/* First Grid - Google Map */}
                    <div className="contact3Map">
                        <iframe
                            title="Joyful Plastics Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7697.6949495848385!2d72.87527401322282!3d20.41262630719627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0d00e623acfcb%3A0xe1f281e84c3b80df!2sJoyful%20Plastics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1750233039552!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Second Grid - Manufacturing Locations */}
                    <div className="contact3Locations">
                        <h2>Manufacturing Locations</h2>

                        <div className="contact3LocationContent">
                            <div className="contact3LocationDetails">
                                <h3 className="contact3LocationTitle">
                                    Joyful Plastics Pvt. Ltd
                                </h3>

                                <div className="contact3AddressWrapper">
                                    <div className="contact3LocationIconWrapper">
                                        <img
                                            src={location}
                                            alt="Location"
                                            className="contact3LocationIcon"
                                        />
                                    </div>
                                    <p className="contact3LocationAddress">
                                        22/1-A, 23a-1, 24/1-4, 26/4-8, 27/5-6,<br />
                                        Behind Jagruti Textiles, Dabhel, Nani Daman,<br />
                                        Daman – 396210, Gujarat. INDIA
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="contact3FactoryImage">
                            <img
                                src={factory}
                                alt="Joyful Plastics Factory"
                                className="contact3FactoryImg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs3;