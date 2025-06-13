import "./Section.css"
import Section3_1 from "../../assets/section3/100-Virgin-Plastic.svg"
import Section3_2 from "../../assets/section3/Easy-to-Clean-and-Maintain.svg"
import Section3_3 from "../../assets/section3/Ergonomic-Safe-Design.svg"
import Section3_4 from "../../assets/section3/Made-for-Indian-Homes.svg"
import Section3_5 from "../../assets/section3/Non-Toxic-and-BPA-Free.svg"
import Section3_6 from "../../assets/section3/recyclable-environmentally-responsible.svg"
import Section3_7 from "../../assets/section3/Sturdy-Build-Lasts-Longer.svg"
import Section3_8 from "../../assets/section3/Vibrant-Fade-Resistant-Colors.svg"
import Section3_9 from "../../assets/section3/why-joyful.jpg"


const Section3 = () => {
    return (
        <section className="why-joyful-different ">
            <div className="page-width">
                <div className="grid-row">
                    <div className="grid-column">
                        <h2>Why Joyful <strong>Different form Others</strong></h2>
                        <div className="grid-row-child-wrapper">
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_1} width="" alt="100% Virgin Plastic" />
                                <div className="grid-content-wrapper">
                                    <h3>100% Virgin Plastic</h3>
                                    <p>Made from premium virgin plastic for better strength and hygiene.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_2} width="" alt="Non-Toxic & BPA Free" />
                                <div className="grid-content-wrapper">
                                    <h3>Non-Toxic & BPA Free</h3>
                                    <p>Safe for all ages, no harmful chemicals, ever</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_3} width="" alt="Made for Indian Homes" />
                                <div className="grid-content-wrapper">
                                    <h3>Made for Indian Homes</h3>
                                    <p>Built tough to handle everyday Indian household use.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_4} width="" alt="Sturdy Build. Lasts Longer." />
                                <div className="grid-content-wrapper">
                                    <h3>Sturdy Build. Lasts Longer.</h3>
                                    <p>Crack-resistant and sturdy made to last for years.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_5} width="" alt="Easy to Clean & Maintain" />
                                <div className="grid-content-wrapper">
                                    <h3>Easy to Clean & Maintain</h3>
                                    <p>Smooth surfaces for quick, no-fuss cleaning.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_6} width=""
                                    alt="Ergonomic & Safe Design" />
                                <div className="grid-content-wrapper">
                                    <h3>Ergonomic & Safe Design</h3>
                                    <p>No sharp edges, just smooth, safe handling.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_7} width=""
                                    alt="Vibrant, Fade-Resistant Colors" />
                                <div className="grid-content-wrapper">
                                    <h3>Vibrant, Fade-Resistant Colors</h3>
                                    <p>Bright, vibrant colors that stay fresh over time.</p>
                                </div>
                            </div>
                            <div className="grid-column-child-wrapper">
                                <img src={Section3_8} width=""
                                    alt="Recyclable & Environmentally Responsible" />
                                <div className="grid-content-wrapper">
                                    <h3>Recyclable & Environmentally Responsible</h3>
                                    <p>Fully recyclable products that care for the planet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-column">
                        <div className="img-wrapper">
                            <img src={Section3_9} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Section3













import "./Section.css"
import Section4_1 from "../../assets/section3/flipkart.png"
import Section4_2 from "../../assets/section3/reliance-retail.png"
import Section4_3 from "../../assets/section3/big-bazaar.png"
import Section4_4 from "../../assets/section3/amazon.png"
import Section4_5 from "../../assets/section3/star-bazaar.png"
import Section4_6 from "../../assets/section3/walmart.png"

const Section4 = () => {
    return (
        <section class="joyful-clients">
            <div class="page-width">
                <div class="joyful-clients-wrapper">
                    <h2>Find us at your favourite <strong>marketplace</strong></h2>
                    <div class="grid-row">
                        <div class="grid-column">
                            <img src={Section4_1} width="100%" height="auto" alt="Flipkart"/>
                        </div>
                        <div class="grid-column">
                            <img src={Section4_2} width="100%" height="auto" alt="Reliance Retail"/>
                        </div>
                        <div class="grid-column">
                            <img src={Section4_3} width="100%" height="auto" alt="Big Bazaar"/>
                        </div>
                        <div class="grid-column">
                            <img src={Section4_4} width="100%" height="auto" alt="Amazon"/>
                        </div>
                        <div class="grid-column">
                            <img src={Section4_5} width="100%" height="auto" alt="Big Bazaar"/>
                        </div>
                        <div class="grid-column">
                            <img src={Section4_6} width="100%" height="auto" alt="Walmart"/>
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
    )
}

export default Section4

















import "./Section.css"
import Section5_1 from "../../assets/section3/instagram-icon.svg"
import Section5_2 from "../../assets/section3/instagram-2.jpg"
import Section5_3 from "../../assets/section3/instagram-3.jpg"
import Section5_4 from "../../assets/section3/instagram-4.jpg"
import Section5_5 from "../../assets/section3/instagram-5.jpg"
import Section5_6 from "../../assets/section3/instagram-6.jpg"
import Section5_7 from "../../assets/section3/instagram-7.jpg"
import Section5_8 from "../../assets/section3/instagram-8.jpg"
import Section5_9 from "../../assets/section3/instagram-9.jpg"
import Section5_10 from "../../assets/section3/instagram-10.jpg"



const Section5 = () => {
    return (
        <section className="follow-on-instagram">
            <h2><img src={Section5_1} width="40px" height="40px" /> <span>Follow Us <strong>joyful</strong></span></h2>
            <div className="follow-on-instagram-wrapper">
                <div className="grid-row">
                    <div className="grid-column first-img">

                    </div>
                    <div className="grid-column mobile-show">
                        <div className="grid-child-row">
                            <div className="grid-child-column">
                                <img src={Section5_2} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_3} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_4} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_5} width="100%" />
                            </div>
                        </div>
                    </div>
                    <div className="grid-column">
                        <img src={Section5_6} width="100%" />
                    </div>
                    <div className="grid-column">
                        <div className="grid-child-row">
                            <div className="grid-child-column">
                                <img src={Section5_7} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_8} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_9} width="100%" />
                            </div>
                            <div className="grid-child-column">
                                <img src={Section5_10} width="100%" />
                            </div>
                        </div>
                    </div>
                    <div className="grid-column last-img"  >

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5
