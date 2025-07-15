import React, { useMemo } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const ProductDetailCard = React.memo(({
    product,
    selectedColor,
    selectedSize,
    colorVariants = [],
    sizeVariants = [],
    onColorChange,
    onSizeChange,
    currentMainImage,
    descriptionLines
}) => {
    const sanitizeHTML = useMemo(() => (html) => {
        return { __html: html };
    }, []);

    return (
        <div className="product-grid-row pagewidth">
            <div className="product-grid-column left-column">
                {(colorVariants.length > 0 || sizeVariants.length > 0) && (
                    <div className="variants-container">
                        {colorVariants.map((color) => (
                            <div key={`color-${color.name}`} className="variant-thumbnails">
                                <img
                                    src={color.image}
                                    alt={color.name}
                                    className={`variant-thumbnail ${selectedColor?.name === color.name ? 'active' : ''}`}
                                    onClick={() => onColorChange(color)}
                                    loading="lazy"
                                />
                            </div>
                        ))}

                        {sizeVariants.map((size) => (
                            <div
                                key={`size-${size.value}`}
                                className={`variant-thumbnails ${selectedSize?.value === size.value ? 'active' : ''}`}
                                onClick={() => onSizeChange(size)}
                            >
                                {size.image ? (
                                    <img
                                        src={size.image}
                                        alt={size.value}
                                        className="variant-thumbnail"
                                        loading="lazy"
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
                        src={currentMainImage}
                        alt={product.name}
                        className="product-main-image"
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="product-grid-column right-column">
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>

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

                    <button className="enquiry-button">Send Enquiry</button>

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
    );
});

export default ProductDetailCard;