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
    selectedCapacity,
    colorVariants = [],
    sizeVariants = [],
    capacityVariants = [],
    onColorChange,
    onSizeChange,
    onCapacityChange,
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

    const handleCapacityChange = (capacity) => {
        onCapacityChange(capacity);
        if (capacity.image) {
            setMainImage(capacity.image);
        }
    };

    const handleEnquiryClick = () => {
        navigate('/inquiry', {
            state: {
                product: {
                    ...product,
                    color: selectedColor?.name,
                    size: selectedSize?.value,
                    capacity: selectedCapacity?.value
                }
            }
        });
    };

    // Filter size variants to only those with images for thumbnail display
    const sizeVariantsWithImages = useMemo(() =>
        sizeVariants.filter(size => size.image),
        [sizeVariants]);

    return (
        <div className={`product-grid-row ${isRelatedProduct ? 'related-product' : ''}`}>
            <div className="product-grid-column left-column">
                {(colorVariants.length > 0 || sizeVariantsWithImages.length > 0 || capacityVariants.length > 0) && (
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

                        {sizeVariantsWithImages.map((size) => (
                            <div
                                key={`size-${size.value}`}
                                className={`variant-thumbnails ${selectedSize?.value === size.value ? 'active' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                <img
                                    src={size.image}
                                    alt={size.value}
                                    className="variant-thumbnail"
                                    loading="lazy"
                                    onMouseEnter={() => size.image && setMainImage(size.image)}
                                    onMouseLeave={() => selectedSize?.image && setMainImage(selectedSize.image)}
                                />
                            </div>
                        ))}

                        {capacityVariants.map((capacity) => (
                            <div
                                key={`capacity-${capacity.value}`}
                                className={`variant-thumbnails ${selectedCapacity?.value === capacity.value ? 'active' : ''}`}
                                onClick={() => handleCapacityChange(capacity)}
                            >
                                {capacity.image ? (
                                    <img
                                        src={capacity.image}
                                        alt={capacity.value}
                                        className="variant-thumbnail"
                                        loading="lazy"
                                        onMouseEnter={() => capacity.image && setMainImage(capacity.image)}
                                        onMouseLeave={() => selectedCapacity?.image && setMainImage(selectedCapacity.image)}
                                    />
                                ) : (
                                    <div className="capacity-thumbnail-text">{capacity.value}</div>
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
                    <div className="option-selection">

                        {colorVariants.length > 0 && (
                            <div className="option-container">
                                <label className='option-name'>Color: <span className="option-span">{selectedColor?.name}</span></label>
                                <div className="option-variants">
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
                            <div className="option-container">
                                <label className='option-name'>Size: <span className="option-span">{selectedSize?.value}</span></label>
                                <div className="option-variants">
                                    {sizeVariants.map((size) => (
                                        <span
                                            key={`size-btn-${size.value}`}
                                            className={`size-square ${selectedSize?.value === size.value ? 'active' : ''}`}
                                            onClick={() => onSizeChange(size)}
                                        >
                                            {size.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {capacityVariants.length > 0 && (
                            <div className="option-container">
                                <label className='option-name'>Capacity: <span className="option-span">{selectedCapacity?.value}</span></label>
                                <div className="option-variants">
                                    {capacityVariants.map((capacity) => (
                                        <span
                                            key={`capacity-btn-${capacity.value}`}
                                            className={`capacity-circle${selectedCapacity?.value === capacity.value ? 'active' : ''}`}
                                            onClick={() => onCapacityChange(capacity)}
                                        >
                                            {capacity.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
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