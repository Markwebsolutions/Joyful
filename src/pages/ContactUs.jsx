import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactUs1 from "./ContactUspages/ContactUs1";
import ContactUs2 from "./ContactUspages/ContactUs2";
import ContactUs3 from "./ContactUspages/ContactUs3";
import Section5 from "./homepage/Section5";

const ContactUs = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                // Small timeout to ensure DOM is fully rendered
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"  // Aligns to top of element
                    });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div className="contact-us-page">
            <ContactUs1 />

            {/* This is the section we want to scroll to */}
            <section id="contact-form" className="contact-form-section">
                <ContactUs2 />
            </section>

            <ContactUs3 />
            <Section5 />
        </div>
    );
};

export default ContactUs;