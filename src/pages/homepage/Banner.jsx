import './banner.css';
import grid1 from "../../assets/grid-1.jpg";
import grid2 from "../../assets/grid-2.jpg";
import grid5 from "../../assets/grid-5.jpg";
import video from "../../assets/video.mp4";
import grid3_1 from "../../assets/grid-1.1.jpg";
import grid3_2 from "../../assets/grid-1.2.jpg";
import grid3_3 from "../../assets/grid-1.3.jpg";
import grid3_4 from "../../assets/grid-1.4.jpg";
import mobile_icon from "../../assets/mobile-icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import SplitText from '../../style/SplitText';
import GlareHover from '../../style/GlareHover';



const Banner = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        // This function will attempt to play all videos on the page
        const playVideos = () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.play().catch(error => {
                    console.log('Video play failed:', error);
                });
            });
        };
        playVideos();
        document.addEventListener('click', playVideos, { once: true });
        document.addEventListener('touchstart', playVideos, { once: true });

        return () => {
            document.removeEventListener('click', playVideos);
            document.removeEventListener('touchstart', playVideos);
        };
    }, []);
    // Handler for the Send Inquiry button
    const handleInquiryClick = () => {
        navigate("/contact#contact-form");
    };
    return (
        <section className="home-banner">
            {/* Background image with overlay */}
            <div className="home-bg-overlay"></div>
            <div className="container">
                <div className="hero-grid">
                    {/* Left side (50%) */}
                    <div className="hero-left">
                        <div className="hero-text-content">
                            <h4 className="hero-subtitle">India's Largest Manufacturer and seller of</h4>
                            <SplitText
                                text={
                                    <>
                                        Diverse range <span className="inline-block md:inline">of plastic products</span>
                                    </>
                                }
                                className="hero-title"
                                delay={100}
                                duration={0.6}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="left"
                            />
                            <p className="hero-description">Enhance everyday life through functional plastic items produced with advanced technologies such as schoolware, Kitchenware, Home furniture and more...</p>
                            <div className="hero-actions">
                                {/* <GlareHover
                                    className="hero-button"
                                    background="#D67A1D"
                                    glareColor="#ffffff"
                                    glareOpacity={0.5}
                                    glareAngle={-45}
                                    glareSize={250}
                                    transitionDuration={650}
                                    borderRadius="55px"
                                    style={{ padding: 0, border: "none" }}
                                >
                                    <button
                                        className="primary-button"
                                        onClick={handleInquiryClick}
                                        style={{ background: "transparent", border: "none", padding: "0.77rem 2rem" }}
                                    >
                                        Send Inquiry
                                        <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
                                    </button>
                                </GlareHover> */}
                                <button
                                    className="primary-button hero-button"
                                    onClick={handleInquiryClick} // Add the click handler
                                >
                                    Send Inquiry
                                    <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
                                </button>
                                <div className="hero-phone">
                                    <img src={mobile_icon} alt="Mobile Number Icon" />
                                    <div className="hero-phone-number-details">
                                        Call us now:<br />
                                        <span>+91 22 67402200</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side (50%) */}
                    <div className="hero-right">
                        <div className="image-grid">
                            {/* Row 1 - 2 columns */}
                            <div className="grid-item">
                                <img src={grid1} alt="kitchen set" />
                            </div>
                            <div className="grid-item">
                                <img src={grid2} alt="kitchen set" />
                            </div>
                            {/* Row 2 - 2 columns */}
                            <div className="grid-item grid-item-split">
                                <div className="grid-child-item">
                                    <img src={grid3_1} alt="kitchen set" />
                                </div>
                                <div className="grid-child-item">
                                    <img src={grid3_2} alt="kitchen set" />
                                </div>
                            </div>

                            <div className="grid-item grid-item-split">
                                <div className="grid-child-item">
                                    <img src={grid3_3} alt="kitchen set" />
                                </div>
                                <div className="grid-child-item">
                                    <img src={grid3_4} alt="kitchen set" />
                                </div>
                            </div>

                            {/* Row 3 - 2 columns */}
                            <div className="grid-item">
                                <img src={grid5} alt="kitchen set" />
                            </div>
                            <div className="grid-item">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="grid-video"
                                    webkit-playsinline="true" // For older iOS versions
                                    x-webkit-airplay="allow" // For AirPlay support
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;