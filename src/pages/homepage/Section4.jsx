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
        <section className="joyful-clients">
            <div className="page-width">
                <div className="joyful-clients-wrapper">
                    <h2>Find us at your favourite <strong>marketplace</strong></h2>
                    <div className="grid-row">
                        <div className="grid-column">
                            <img src={Section4_1} width="100%" height="auto" alt="Flipkart" />
                        </div>
                        <div className="grid-column">
                            <img src={Section4_2} width="100%" height="auto" alt="Reliance Retail" />
                        </div>
                        <div className="grid-column">
                            <img src={Section4_3} width="100%" height="auto" alt="Big Bazaar" />
                        </div>
                        <div className="grid-column">
                            <img src={Section4_4} width="100%" height="auto" alt="Amazon" />
                        </div>
                        <div className="grid-column">
                            <img src={Section4_5} width="100%" height="auto" alt="Big Bazaar" />
                        </div>
                        <div className="grid-column">
                            <img src={Section4_6} width="100%" height="auto" alt="Walmart" />
                        </div>
                    </div>

                    <div className="countdown-wrapper-items">
                        <div className="stats-container">
                            <div className="stat-item">
                                <div className="stat-value">
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
                                <div className="stat-label">Happy Clients</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">
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
                                <div className="stat-label">5 Star Reviews</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">
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
                                <div className="stat-label">Quality Products</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section4;