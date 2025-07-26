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
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;

const Section5 = () => {
    return (
        <section className="follow-on-instagram">
            <h2><a href={instagramUrl}><img src={Section5_1} width="40px" height="40px" /></a> <span>Follow Us <strong>joyful</strong></span></h2>
            <div className="follow-on-instagram-wrapper">
                <div className="follow-grid-row">
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
