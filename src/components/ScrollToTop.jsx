import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './App.css'; // We'll create this next

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > window.innerHeight * 1.5) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button onClick={scrollToTop} aria-label="Scroll to top">
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;