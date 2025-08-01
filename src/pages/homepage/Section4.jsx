import { useState } from "react";
import "./Section.css";
import Section4_1 from "../../assets/section3/flipkart.png";
import Section4_2 from "../../assets/section3/reliance-retail.png";
import Section4_3 from "../../assets/section3/big-bazaar.png";
import Section4_4 from "../../assets/section3/amazon.png";
import Section4_5 from "../../assets/section3/star-bazaar.png";
import Section4_6 from "../../assets/section3/walmart.png";
import CountUp from "../../style/CountUp";

const Section4 = () => {
    const [activeCounter, setActiveCounter] = useState(0);

    const handleCounterComplete = () => {
        setActiveCounter(prev => prev + 1);
    };

    return (
        <div className="section4-wrapper">
            <section className="section4-content">
                <div className="page-width">
                    <div className="joyful-clients-wrapper">
                        <h2>Find us at your favourite <strong>marketplace</strong></h2>

                        <div className="section4-grid">
                            {[Section4_1, Section4_2, Section4_3, Section4_4, Section4_5, Section4_6].map((imgSrc, index) => (
                                <div key={index} className="section4-grid-item">
                                    <img
                                        src={imgSrc}
                                        width="100%"
                                        height="auto"
                                        alt="Marketplace"
                                        className="section4-grid-img"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="section4-stats-wrapper">
                            <div className="section4-stats-container">
                                <div className="section4-stat-item">
                                    <div className="section4-stat-value stat-item">
                                        <CountUp
                                            from={0}
                                            to={1200}
                                            separator=","
                                            direction="up"
                                            duration={1}
                                            className="count-up-text"
                                            startWhen={activeCounter >= 0}
                                            onEnd={handleCounterComplete}
                                        />k
                                    </div>
                                    <div className="section4-stat-label">Happy Clients</div>
                                </div>
                                <div className="section4-stat-item">
                                    <div className="section4-stat-value stat-item">
                                        <CountUp
                                            from={0}
                                            to={92}
                                            suffix="%"
                                            direction="up"
                                            duration={1}
                                            className="count-up-text"
                                            startWhen={activeCounter >= 1}
                                            onEnd={handleCounterComplete}
                                        />%
                                    </div>
                                    <div className="section4-stat-label">5 Star Reviews</div>
                                </div>
                                <div className="section4-stat-item">
                                    <div className="section4-stat-value">
                                        <CountUp
                                            from={0}
                                            to={100}
                                            suffix="+"
                                            direction="up"
                                            duration={1}
                                            className="count-up-text"
                                            startWhen={activeCounter >= 2}
                                            onEnd={handleCounterComplete}
                                        />+
                                    </div>
                                    <div className="section4-stat-label">Quality Products</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Section4;