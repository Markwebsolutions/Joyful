import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import arrow from "../assets/footer/arrow.svg";

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmissionStatus(null);

        if (!email || !email.includes('@')) {
            setSubmissionStatus('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://joyful-backend-backend-final-4-production.up.railway.app/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Subscription failed');
            }

            const data = await response.json();
            setSubmissionStatus(data.message || 'Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus('Failed to subscribe. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass">
            <h3>Stay In The Loop!</h3>
            <p>News, Updates, Offers & Releases</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    <input
                        type="email"
                        placeholder="Email address"
                        aria-label="Email address for newsletter"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        <img src={arrow} alt="Submit" loading="lazy" />
                    </button>
                </div>
                {submissionStatus && (
                    <p className={`submission-status ${submissionStatus.includes('Thank you') ? 'success' : 'error'}`}>
                        {submissionStatus}
                    </p>
                )}
            </form>
        </div>
    );
};

export default EmailForm;