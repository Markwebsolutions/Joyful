import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ContactUs.css';

const ContactForm = ({
    agreeToTerms,
    setAgreeToTerms,
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("https://joyful-backend-backend-final-4-production.up.railway.app/contact-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit enquiry");
            }

            const data = await response.json();
            console.log("Form submitted successfully:", data);

            if (onClose) {
                onClose();
            } else {
                navigate(redirectTo);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit enquiry. Please try again.");
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
                            By clicking on "{buttonText}" you agree with our
                            <a href="/terms" className="terms-link"> Terms and Conditions</a>,
                            meaning you agree to get back in touch with you based on provided
                            information when filling your form.
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={!agreeToTerms || isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : buttonText}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;