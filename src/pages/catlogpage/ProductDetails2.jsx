import { useState } from 'react';
import './ProductDetails.css';
import product_page2 from "../../assets/product_page/productimg2.jpg";
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const ProductDetails2 = () => {
    const productData = {
        colors: [
            {
                name: "product",
                value: "#FFC0CB",
                images: [
                    { id: 1, main: product_page2, thumb: product_page2, alt: "Pink Baby Sipper Front View" }
                ]
            }
        ],
        title: "Hello Baby Sipper",
        description: "Learning to drink beverages is one of the most difficult tasks for a child. Make it easier with Joyful Hello Sipper bottles. This sipper is perfect with strong handles to grip and spout ideal for a baby's mouth which makes drinking easy and ensures fewer spills. Made from no harmful substances, this sipper is safe for babies and can be used daily."
    };

    const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const currentMainImage = selectedColor.images[selectedImageIndex];

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedImageIndex(0);
    };

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <section className="product2-details-section" style={{ backgroundColor: '#F5EDDA' }}>
            <div className="page-width">
                {/* <div className="breadcrumb">Home / {productData.title}</div> */}

                <div className="product-grid-row">
                    <div className="product-grid-column left-column">
                        {/* All color variants section */}

                        <div className="product-image-container">
                            <img
                                src={currentMainImage.main}
                                alt={currentMainImage.alt}
                                className="product-main-image"
                            />
                        </div>
                    </div>

                    <div className="product-grid-column right-column">
                        <div className="product-info">
                            <h1 className="product-title">{productData.title}</h1>
                            <div className="color-option">
                                <label>Color: <span className="selected-color">{selectedColor.name}</span></label>
                                <div className="color-selector">
                                    {productData.colors.map((color) => (
                                        <button
                                            key={color.value}
                                            className={`color-swatch ${selectedColor.value === color.value ? 'active' : ''}`}
                                            style={{ backgroundColor: color.value }}
                                            onClick={() => handleColorChange(color)}
                                            aria-label={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button className="enquiry-button">Send Enquiry</button>

                            <div className="product-description">
                                <h3>Description</h3>
                                <p>{productData.description}</p>
                            </div>

                            <div className="social-share">
                                <span>Share:</span>
                                <div className="social-icons">
                                    <a href="#" aria-label="Share on Instagram">
                                        <FaInstagram className="social-icon" />
                                    </a>
                                    <a href="#" aria-label="Share on Facebook">
                                        <FaFacebookF className="social-icon" />
                                    </a>
                                    <a href="#" aria-label="Share on Twitter">
                                        <FaTwitter className="social-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails2;