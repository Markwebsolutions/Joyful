import './banner.css'; // We'll create this CSS file next
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
import {
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';


const Banner = () => {
    return (
        <section class="home-banner">
            {/* Background image with overlay */}
            <div class="home-bg-overlay"></div>
            <div class="container">
                <div className="hero-grid">
                    {/* Left side (50%) */}
                    <div className="hero-left">
                        <div className="hero-text-content">
                            <h4 className="hero-subtitle">India's Largest Manufacturer and seller of</h4>
                            <h1 className="hero-title">Diverse range <span>of plastic products</span></h1>
                            <p className="hero-description">Enhance everyday life through functional plastic items produced with advanced technologies such as schoolware, Kitchenware, Home furniture and more...</p>
                            <div className="hero-actions">
                                <button className="primary-button hero-button">
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
                                <video autoPlay loop muted className="grid-video">
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