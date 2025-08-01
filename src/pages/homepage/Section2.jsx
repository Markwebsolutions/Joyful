import { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import section2_1 from "../../assets/Section2/section2_1.jpg";
import section2_2 from "../../assets/Section2/section2_2.jpg";
import section2_3 from "../../assets/Section2/section2_3.jpg";
import section2_4 from "../../assets/Section2/section2_4.jpg";
import section2_5 from "../../assets/Section2/section2_5.jpg";
import section2_6 from "../../assets/Section2/section2_6.jpg";
import section2_2mobile from "../../assets/Section2/section2_2mobile.jpg";
import section2_6mobile from "../../assets/Section2/section2_6mobile.jpg";
import section2_7 from "../../assets/Section2/section2_7.jpg";

const Section2 = memo(() => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleExploreClick = (categoryName) => {
        navigate('/catalog', { state: { selectedCategory: categoryName } });
    };

    const images = useMemo(() => [
        { src: section2_1, span: 1, categoryName: "Baby Care", categoryId: 3 },
        { src: section2_2, span: 2, mobileSrc: section2_2mobile, categoryName: "Schoolware", categoryId: 5 },
        { src: section2_3, span: 1, categoryName: "Home Furniture", categoryId: 4 },
        { src: section2_4, span: 1, categoryName: "Kitchenware", categoryId: 7 },
        { src: section2_5, span: 1, categoryName: "Restaurant Trays", categoryId: 8 },
        { src: section2_6, span: 2, mobileSrc: section2_6mobile, categoryName: "salt and peppers container" },
        { src: section2_7, span: 1, categoryName: "Multipurpose Items", categoryId: 6 },
    ], []);

    const renderGridItem = (image, index) => {
        const isSpan2 = image.span === 2;
        const imgSrc = isSpan2 && isMobile ? image.mobileSrc : image.src;
        const buttonClass = isSpan2 ? "dark-button btn-span-2" : "dark-button btn-span-1";

        return (
            <div key={index} className={isSpan2 ? "combined-grid-item" : "grid-item-section"}>
                <div className="image-container">
                    <img src={imgSrc} alt={image.categoryName} />
                    <button
                        className={buttonClass}
                        onClick={() => handleExploreClick(image.categoryName)}
                    >
                        Explore Now <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="grid-section">
            <div className="grid-container">
                {images.map((image, index) => renderGridItem(image, index))}
            </div>
        </div>
    );
});

export default Section2;