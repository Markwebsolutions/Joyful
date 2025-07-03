import '../AboutUspages/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import OurCatlog from "../../assets/product_page/Catlogbanner.jpg"


const Product1 = () => {
    return (
        <div>
            <div className="aboutUsContainer" style={{ backgroundImage: `url(${OurCatlog})` }}>
                <div className="navigation">
                    <span>Home</span>
                    <FontAwesomeIcon icon={faCaretRight} />
                    <span>Our Catlog</span>
                </div>

                <h1 className="aboutUsTitle">Our Catlog</h1>
            </div>
        </div>
    )
}

export default Product1



