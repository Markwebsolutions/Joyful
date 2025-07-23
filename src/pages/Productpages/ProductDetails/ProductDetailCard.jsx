import React, { useState, useMemo } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
const twitterUrl = import.meta.env.VITE_TWITTER_URL;

const ProductDetailCard = React.memo(({
    product,
    selectedColor,
    selectedSize,
    colorVariants = [],
    sizeVariants = [],
    onColorChange,
    onSizeChange,
    currentMainImage,
    descriptionLines,
    isRelatedProduct = false
}) => {
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(currentMainImage);
    const sanitizeHTML = useMemo(() => (html) => ({ __html: html }), []);

    // Update main image when selected color or currentMainImage prop changes
    React.useEffect(() => {
        setMainImage(currentMainImage);
    }, [currentMainImage]);

    const handleColorChange = (color) => {
        onColorChange(color);
        if (color.image) {
            setMainImage(color.image);
        }
    };

    const handleSizeChange = (size) => {
        onSizeChange(size);
        if (size.image) {
            setMainImage(size.image);
        }
    };

    const handleEnquiryClick = () => {
        navigate('/inquiry', {
            state: {
                product: {
                    ...product,
                    color: selectedColor?.name,
                    size: selectedSize?.value
                }
            }
        });
    };

    return (
        <div className={`product-grid-row ${isRelatedProduct ? 'related-product' : ''}`}>
            <div className="product-grid-column left-column">
                {(colorVariants.length > 0 || sizeVariants.length > 0) && (
                    <div className="variants-container">
                        {colorVariants.map((color) => (
                            <div key={`color-${color.name}`} className="variant-thumbnails">
                                <img
                                    src={color.image}
                                    alt={color.name}
                                    className={`variant-thumbnail ${selectedColor?.name === color.name ? 'active' : ''}`}
                                    onClick={() => handleColorChange(color)}
                                    onMouseEnter={() => color.image && setMainImage(color.image)}
                                    onMouseLeave={() => selectedColor?.image && setMainImage(selectedColor.image)}
                                    loading="lazy"
                                />
                            </div>
                        ))}

                        {sizeVariants.map((size) => (
                            <div
                                key={`size-${size.value}`}
                                className={`variant-thumbnails ${selectedSize?.value === size.value ? 'active' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                {size.image ? (
                                    <img
                                        src={size.image}
                                        alt={size.value}
                                        className="variant-thumbnail"
                                        loading="lazy"
                                        onMouseEnter={() => size.image && setMainImage(size.image)}
                                        onMouseLeave={() => selectedSize?.image && setMainImage(selectedSize.image)}
                                    />
                                ) : (
                                    <div className="size-thumbnail-text">{size.value}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="product-image-container">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="product-main-image"
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="product-grid-column right-column">
                <div className="product-info">
                    <h1 className={`product-title ${isRelatedProduct ? 'related' : ''}`}>{product.name}</h1>

                    {colorVariants.length > 0 && (
                        <div className="color-option">
                            <label>Color: <span className="selected-color">{selectedColor?.name}</span></label>
                            <div className="color-options">
                                {colorVariants.map((color) => (
                                    <span
                                        key={`color-btn-${color.name}`}
                                        className={`color-circle ${selectedColor?.name === color.name ? 'active' : ''}`}
                                        style={{
                                            backgroundColor: color.hex || '#ccc',
                                            borderColor: color.hex ? '#ddd' : '#999'
                                        }}
                                        onClick={() => onColorChange(color)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {sizeVariants.length > 0 && (
                        <div className="size-option">
                            <label>Size: <span className="selected-size">{selectedSize?.value}</span></label>
                            <div className="size-options">
                                {sizeVariants.map((size) => (
                                    <span
                                        key={`size-btn-${size.value}`}
                                        className={`size-option ${selectedSize?.value === size.value ? 'active' : ''}`}
                                        onClick={() => onSizeChange(size)}
                                    >
                                        {size.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="enquiry-button" onClick={handleEnquiryClick}>Send Enquiry</button>

                    <div className="product-description">
                        <h3 style={{ fontSize: '18px' }}>Description</h3>
                        {descriptionLines.map((line, index) => (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={sanitizeHTML(line)}
                                style={{ fontSize: '14px', marginBottom: '0.5rem' }}
                            />
                        ))}
                    </div>

                    {!isRelatedProduct && (
                        <div className="social-share">
                            <span>Share:</span>
                            <div className="social-icons">
                                <a href={instagramUrl} aria-label="Share on Instagram">
                                    <FaInstagram className="social-icon" />
                                </a>
                                <a href={facebookUrl} aria-label="Share on Facebook">
                                    <FaFacebookF className="social-icon" />
                                </a>
                                <a href={twitterUrl} aria-label="Share on Twitter">
                                    <FaTwitter className="social-icon" />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ProductDetailCard;