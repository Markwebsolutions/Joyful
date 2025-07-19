import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductDetailForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFocus = (e) => {
        const parent = e.target.parentNode;
        parent.classList.add('focused');
    };

    const handleBlur = (e) => {
        const parent = e.target.parentNode;
        if (!e.target.value) {
            parent.classList.remove('focused');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                product: product?.name || '', // Using product name as the product field
                message: formData.message
            };

            const response = await fetch(
                'https://joyful-backend-backend-final-4-production.up.railway.app/enquiry',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (response.ok) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    navigate(-1); // Go back to the product detail page after success
                }, 2000);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-info-form-container">
            <h2>Product Inquiry</h2>
            {submitSuccess ? (
                <div className="product-info-form success-message">
                    <p>Your inquiry has been submitted successfully!</p>
                    <p>You'll be redirected back shortly...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="product-info-form">
                    {product && (
                        <div className="product-info-form product-info-group">
                            <label>Product:</label>
                            <div className="product-info-form product-details">
                                <p>{product.name}</p>
                            </div>
                        </div>
                    )}

                    <div className="product-info-form input-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            rows="4"
                        />
                    </div>

                    {submitError && <div className="error-message">{submitError}</div>}

                    <button
                        type="submit"
                        className="product-info-form submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductDetailForm;