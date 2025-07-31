import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ContactUs.css';

const ContactForm = ({
    formTitle = "Get in Touch",
    showNameFields = true,
    showSubjectField = true,
    showPhoneField = true,
    customSubjectLabel = "What are you looking for?",
    phoneLabel = "Phone Number",
    buttonText = "Submit",
    redirectTo = "/contact",
    onClose
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        querytype: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        let timer;
        if (showSuccess) {
            timer = setTimeout(() => {
                setShowSuccess(false);
                if (onClose) onClose();
                else navigate(redirectTo);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccess, navigate, redirectTo, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("https://joyfulbackend-production.up.railway.app/contact-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Server responded with status ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json')
                ? await response.json()
                : await response.text();

            console.log("Form submitted successfully:", data);
            setShowSuccess(true);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                querytype: '',
                message: ''
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.message || "Failed to submit enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form">
            <h2>{formTitle}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                {showNameFields && (
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            placeholder="First name"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            placeholder="Last name"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {showPhoneField && (
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder={phoneLabel}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit phone number"
                    />
                )}

                {showSubjectField && (
                    <input
                        type="text"
                        className="form-control"
                        name="querytype"
                        placeholder={customSubjectLabel}
                        value={formData.querytype}
                        onChange={handleChange}
                        required
                    />
                )}

                <textarea
                    className="form-control"
                    name="message"
                    placeholder="Type your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : buttonText}
                </button>
            </form>

            {/* Success Popup with Dark Overlay */}
            {showSuccess && (
                <>
                    <div className="success-overlay">
                        <div className="success-popup">
                            <button
                                className="success-popup-close"
                                onClick={() => setShowSuccess(false)}
                                aria-label="Close success message"
                            >
                                &times;
                            </button>
                            <div className="tick-animation">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                                <h3>Success!</h3>
                                <p>Your message has been sent successfully</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactForm;