import { useEffect, useRef } from "react";
import AboutUs_1 from "../../assets/AboutUs/AboutUs_1.jpg";
import AboutUs_2 from "../../assets/AboutUs/AboutUs_2.jpg";
import AboutUs_3 from "../../assets/AboutUs/AboutUs_3.jpg";
import AboutUs_4 from "../../assets/AboutUs/AboutUs_4.jpg";
import gift from "../../assets/Section1/gift.svg";
import "./AboutUs.css";

const AboutUs2 = () => {
    const sectionRefs = useRef([]);

    const items = [
        {
            src: AboutUs_1,
            heading: "Company Overview",
            content: [
                "Joyful Plastics is a 21 year old legacy established in 1995",
                "We are assisted by a dedicated management team, most of whom have more than 10 years of experience in their respective fields",
                "We are professional manufacturers and exporters of household plastic ware",
                "We specialize in injection molding and blow molding",
                "We enjoy a credible reputation among customers in India as well as Abroad"
            ],
            bgColor: "#000CB70D"
        },
        {
            src: AboutUs_2,
            heading: "Plant Overview",
            content: [
                "State-of-art facility at Daman in India.",
                "Fleet of over 50 Injection Molding Machines that range from 60 tonnes to 350 tonnes.",
                "In-house screen printing and foil stamping facility",
                "Annual production capacity of over 2000 tonnes"
            ],
            bgColor: "#fff"
        },
        {
            src: AboutUs_3,
            heading: "The Future is Joyful",
            content: [
                "We seek to increase profitability through greater sales volume obtained from new products and markets.",
                "To be a collaborative platform for industry-driven research for the benefit of our consumers by partnering up with external research institutes.",
                "With the available opportunities, consistency and resources available to us, we also look ahead to:",
            ],
            subcontent: ['Concentric Diversification', 'Horizontal Diversification'],
            bgColor: "#F5EDDA"
        }, {
            src: AboutUs_4,
            heading: "Design Patents",
            content: [
                "We use innovative methods and technologically sound processes to deliver the top quality products to our customers.",
                "Through our business acumen, we have managed to acquire the necessary licenses and patents for our products.",
                "We have registered design patents for more than 50 products and are in the process of applying for more.",
                "We are authorized licensees in the stationary category for Walt Disney, Nickelodeon, Cartoon Network India and Viacom 18."
            ],
            bgColor: "#fff"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const container = entry.target.querySelector('.about-us-container');
                        const image = entry.target.querySelector('.about-us-image-wrapper');
                        const content = entry.target.querySelector('.about-us-content');

                        if (container.classList.contains('even')) {
                            image.classList.add('slide-in-left');
                            content.classList.add('slide-in-right');
                        } else {
                            image.classList.add('slide-in-right');
                            content.classList.add('slide-in-left');
                        }

                        // Unobserve after animation to prevent repeating
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className="about-us-wrapper">
            {items.map((item, index) => (
                <section
                    key={index}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="about-us-section"
                    style={{ backgroundColor: item.bgColor }}
                >
                    <div className={`about-us-container ${index % 2 === 0 ? 'even' : 'odd'}`}>
                        <div className="about-us-image-wrapper">
                            <img
                                src={item.src}
                                alt={item.heading}
                                className="about-us-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="about-us-content">
                            <h2 className="about-us-heading">{item.heading}</h2>
                            <ul className="about-us-list">
                                {item.content.map((point, i) => (
                                    <li key={`content-${i}`} className="about-us-list-item">
                                        <img src={gift} alt="bullet point" className="gift-icon" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                                {item.subcontent?.map((subpoint, i) => (
                                    <li key={`sub-${i}`} className="about-us-list-item subcontent">
                                        <span>- {subpoint}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default AboutUs2;