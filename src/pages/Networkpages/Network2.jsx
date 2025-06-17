import "../homepage/Section.css"
import Section4_1 from "../../assets/section3/flipkart.png"
import Section4_2 from "../../assets/section3/reliance-retail.png"
import Section4_3 from "../../assets/section3/big-bazaar.png"
import Section4_4 from "../../assets/section3/amazon.png"
import Section4_5 from "../../assets/section3/star-bazaar.png"
import Section4_6 from "../../assets/section3/walmart.png"
import Network_last from "../../assets/Network/Network_last.jpg" 



const Network2 = () => {
    return (
        <div className="network-section-wrapper">
            <section className="joyful-network-clients">
                <div className="page-width">
                    <div class="joyful-clients-wrapper">
                        <h2>Find us at your favourite <strong>marketplace</strong></h2>
                        <div className="marketplace-grid">
                            <div className="marketplace-item">
                                <img src={Section4_1} width="100%" height="auto" alt="Flipkart" loading="lazy" />
                            </div>
                            <div className="marketplace-item">
                                <img src={Section4_2} width="100%" height="auto" alt="Reliance Retail" loading="lazy" />
                            </div>
                            <div className="marketplace-item">
                                <img src={Section4_3} width="100%" height="auto" alt="Big Bazaar" loading="lazy" />
                            </div>
                            <div className="marketplace-item">
                                <img src={Section4_4} width="100%" height="auto" alt="Amazon" loading="lazy" />
                            </div>
                            <div className="marketplace-item">
                                <img src={Section4_5} width="100%" height="auto" alt="Star Bazaar" loading="lazy" />
                            </div>
                            <div className="marketplace-item">
                                <img src={Section4_6} width="100%" height="auto" alt="Walmart" loading="lazy" />
                            </div>
                        </div>

                        <div class="countdown-wrapper-items">
                            <div class="stats-container">
                                <div class="stat-item">
                                    <div class="stat-value">1.2k</div>
                                    <div class="stat-label">Happy Clients</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">92%</div>
                                    <div class="stat-label">5 Star Reviews</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">100+</div>
                                    <div class="stat-label">Quality Products</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separate container for the overlapping image */}
            <div className="network-image-container">
                <div className="page-width">
                    <img
                        src={Network_last}
                        alt="Our marketplace presence"
                        className="network-image"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}

export default Network2
