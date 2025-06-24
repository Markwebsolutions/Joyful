import React from "react";
import WhatsApp from "../../assets/ContactUs/whatsapp.svg";
import location from "../../assets/ContactUs/location.svg";
import mail from "../../assets/ContactUs/mail.svg";
import phone from "../../assets/ContactUs/phone.svg";
import './ContactUs.css';
import ContactForm from "./ContactUsForm";

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

                <ContactForm agreeToTerms={agreeToTerms} setAgreeToTerms={setAgreeToTerms} />
            </div>
        </div>
    );
};

export default ContactUs;