import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import section2_1 from "../../assets/Section2/section2_1.jpg";
import section2_2 from "../../assets/Section2/section2_2.jpg";
import section2_3 from "../../assets/Section2/section2_3.jpg";
import section2_4 from "../../assets/Section2/section2_4.jpg";
import section2_5 from "../../assets/Section2/section2_5.jpg";
import section2_6 from "../../assets/Section2/section2_6.jpg";
import section2_7 from "../../assets/Section2/section2_7.jpg";

const Section2 = () => {
    const images = [
        { src: section2_1, span: 1 },
        { src: section2_2, span: 2 },
        { src: section2_3, span: 1 },
        { src: section2_4, span: 1 },
        { src: section2_5, span: 1 },
        { src: section2_6, span: 2 },
        { src: section2_7, span: 1 },
    ];

    return (
        <div className="grid-section">
            <div className="grid-container">
                {images.map((image, index) => (
                    image.span === 1 ? (
                        <div key={index} className="grid-item-section">
                            <div className="image-container">
                                <img src={image.src} alt="" />
                                <button className="btn-span-1">
                                    Explore Now <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="combined-grid-item">
                            <div className="image-container">
                                <img src={image.src} alt="Sample" />
                                <button className="btn-span-2">
                                    Explore Now <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Section2;