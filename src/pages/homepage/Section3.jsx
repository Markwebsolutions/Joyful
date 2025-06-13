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
