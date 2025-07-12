import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from 'react';
import ContactUs1 from "./ContactUspages/ContactUs1"; // Not lazy-loaded

// Lazy load contact sections
const ContactUs2 = lazy(() => import("./ContactUspages/ContactUs2"));
const ContactUs3 = lazy(() => import("./ContactUspages/ContactUs3"));
const Section5 = lazy(() => import("./homepage/Section5"));

const LoadingFallback = () => <div className="loading-placeholder" />;

// Memoize the first component
const MemoizedContactUs1 = memo(ContactUs1);

const ContactUs = memo(() => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                const timer = setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [location]);

    return (
        <div className="contact-us-page">
            <MemoizedContactUs1 />

            <section id="contact-form" className="contact-form-section">
                <Suspense fallback={<LoadingFallback />}>
                    <ContactUs2 />
                </Suspense>
            </section>

            <Suspense fallback={<LoadingFallback />}>
                <ContactUs3 />
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
                <Section5 />
            </Suspense>
        </div>
    );
});

export default ContactUs;