import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./feedback.css";
import RightArrow from "../../../assets/feedback/rightarrow.svg";
import LeftArrow from "../../../assets/feedback/leftarrow.svg";

const FeedBack = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef(null);
    const desktopSliderRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch("https://joyfulbackend-production.up.railway.app/feedbacks");
                if (!response.ok) {
                    throw new Error('Failed to fetch feedbacks');
                }
                const data = await response.json();
                setFeedbacks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (feedbacks.length === 0) return;

        // Start auto-sliding for both mobile and desktop
        intervalRef.current = setInterval(() => {
            if (isMobile) {
                nextSlide();
            } else if (feedbacks.length > 3) {
                nextDesktopSlide();
            }
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [isMobile, currentIndex, feedbacks.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
        );
    };

    const nextDesktopSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = feedbacks.length - 3;
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
    };

    const prevDesktopSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = feedbacks.length - 3;
            return prevIndex === 0 ? maxIndex : prevIndex - 1;
        });
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return <div className="feedback-section">Loading feedbacks...</div>;
    }

    if (error) {
        return <div className="feedback-section">Error: {error}</div>;
    }

    if (feedbacks.length === 0) {
        return <div className="feedback-section">No feedbacks available</div>;
    }

    return (
        <section className="feedback-section">
            <h2 className="feedback-heading">
                Trusted Feedback Of Clients
            </h2>

            <div className="feedback-container">
                {isMobile ? (
                    <div className="mobile-slider">
                        <div className="slider-wrapper">
                            <div
                                className="slider-track"
                                ref={sliderRef}
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                {feedbacks.map((feedback, index) => (
                                    <div key={feedback.feedbackid || index} className="feedback-slide">
                                        <div className="feedback-card">
                                            <div className="feedback-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <FontAwesomeIcon
                                                        key={i}
                                                        icon={faStar}
                                                        className={`feedback-star ${i < feedback.star ? 'filled' : ''}`}
                                                    />
                                                ))}
                                            </div>
                                            <h3 className="feedback-card-heading">
                                                {feedback.heading}
                                            </h3>
                                            <p className="feedback-description">
                                                {feedback.description}
                                            </p>
                                            <div className="feedback-author-container">
                                                {feedback.image && (
                                                    <img
                                                        src={feedback.image}
                                                        alt={feedback.name}
                                                        className="feedback-author-img"
                                                    />
                                                )}
                                                <div className="feedback-author">
                                                    - {feedback.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="slider-controls">
                            <div className="slider-dots">
                                {feedbacks.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <div className="slider-buttons">
                                <button
                                    onClick={prevSlide}
                                    className="slider-button prev"
                                    aria-label="Previous feedback"
                                >
                                    <img src={LeftArrow} alt="Previous" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="slider-button next"
                                    aria-label="Next feedback"
                                >
                                    <img src={RightArrow} alt="Next" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="desktop-slider-container">
                        <div className="desktop-slider-wrapper">
                            <div
                                className="desktop-grid"
                                ref={desktopSliderRef}
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                {feedbacks.map((feedback, index) => (
                                    <div key={feedback.feedbackid || index} className="feedback-card">
                                        <div className="feedback-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                    className={`feedback-star ${i < feedback.star ? 'filled' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <h3 className="feedback-card-heading">{feedback.heading}</h3>
                                        <p className="feedback-description">{feedback.description}</p>
                                        <div className="feedback-author-container">
                                            {feedback.image && (
                                                <img
                                                    src={feedback.image}
                                                    alt={feedback.name}
                                                    className="feedback-author-img"
                                                />
                                            )}
                                            <div className="feedback-author">
                                                - {feedback.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="desktop-slider-controls">
                            <div className="desktop-slider-dots">
                                {Array.from({ length: Math.ceil(feedbacks.length / 3) }).map((_, index) => (
                                    <button
                                        key={index}
                                        className={`desktop-dot ${index === Math.floor(currentIndex / 3) ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index * 3)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <div className="desktop-slider-buttons">
                                <button
                                    onClick={prevDesktopSlide}
                                    className="desktop-slider-button"
                                    aria-label="Previous feedback"
                                >
                                    <img src={LeftArrow} alt="Previous" />
                                </button>
                                <button
                                    onClick={nextDesktopSlide}
                                    className="desktop-slider-button"
                                    aria-label="Next feedback"

                                >
                                    <img src={RightArrow} alt="Next" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeedBack;