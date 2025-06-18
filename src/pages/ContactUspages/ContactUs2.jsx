import React from "react";
import WhatsApp from "../../assets/ContactUs/whatsapp.svg";
import location from "../../assets/ContactUs/location.svg";
import mail from "../../assets/ContactUs/mail.svg";
import phone from "../../assets/ContactUs/phone.svg";
import './ContactUs.css';

const ContactUs = () => {
    const [agreeToTerms, setAgreeToTerms] = React.useState(false);

    const contactItems = [
        {
            icon: phone,
            title: "Phone",
            content: "+91 2267402200"
        },
        {
            icon: WhatsApp,
            title: "WhatsApp",
            content: "+91 8879020134"
        },
        {
            icon: mail,
            title: "Email",
            content: "info@joyful.co.in"
        },
        {
            icon: location,
            title: "Address",
            content: "402, 4th floor, Satellite Silver, Near Mittal Industrial Estate, Andheri Kurla Road, Marol, Andheri (East), Mumbai – 400059, Maharashtra. INDIA",
            isAddress: true
        }
    ];

    return (
        <div className="contact-container">
            <div className="contact-wrapper">
                <div className="contact2-info">
                    <p>At Joyful Plastics, we believe in creating innovative solutions that cater to your needs. Since our inception, we have been committed to delivering high-quality products that stand the test of time.</p>

                    {contactItems.map((item, index) => (
                        <div className="contact-item" key={index}>
                            <div className="contact2-icon">
                                <img src={item.icon} alt={item.title} />
                            </div>
                            <div className="contact-details">
                                <h4>{item.title}</h4>
                                <div className={item.isAddress ? "address-content" : "normal-content"}>
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="contact-form">
                    <h2>Get in Touch</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="First name" required />
                            <input type="text" className="form-control" placeholder="Last name" required />
                        </div>

                        <input type="email" className="form-control" placeholder="Email address" required />

                        <select className="form-control" required>
                            <option value="" disabled selected>What are you looking for?</option>
                            <option value="product1">Product 1</option>
                            <option value="product2">Product 2</option>
                            <option value="product3">Product 3</option>
                            <option value="product4">Product 4</option>
                            <option value="other">Other</option>
                        </select>

                        <textarea className="form-control" placeholder="Type your message" required></textarea>

                        <div className="terms-container">
                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="terms-checkbox"
                                    required
                                />
                                <span className="terms-text">
                                    By clicking on "Submit" you agree with our
                                    <a href="/terms" className="terms-link"> Terms and Conditions</a>,
                                    meaning you agree to get back in touch with you based on provided
                                    information when filling your form.
                                </span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!agreeToTerms}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;