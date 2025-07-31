import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductDetails.css"
import SocialShare from './SocialShare';

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

    const cleanDescription = useMemo(() => {
        return (text) => {
            if (!text) return '';
            let cleaned = text.replace(/<[^>]*>/g, '');
            cleaned = cleaned.replace(/\s+/g, ' ').trim();
            return cleaned;
        };
    }, []);

    // Update main image when currentMainImage changes from parent
    useEffect(() => {
        setMainImage(currentMainImage);
    }, [currentMainImage]);

    // Update main image when selected variants change
    useEffect(() => {
        const newImage = selectedColor?.image || selectedSize?.image || selectedCapacity?.image || product?.mainimage || '';
        if (newImage !== mainImage) {
            setMainImage(newImage);
        }
    }, [selectedColor, selectedSize, selectedCapacity, product?.mainimage, mainImage]);

    const handleColorChange = (color) => {
        onColorChange(color);
        // If the color has an image, update immediately
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

    const sizeVariantsWithImages = useMemo(() =>
        sizeVariants.filter(size => size.image),
        [sizeVariants]);

    const capacityVariantsWithImages = useMemo(() =>
        capacityVariants.filter(capacity => capacity.image),
        [capacityVariants]);

    const shareUrl = window.location.href;
    const shareTitle = `Check out this product: ${product.name}`;
    const productDescription = cleanDescription(product.description || descriptionLines.join(' '));

    return (
        <div className={`product-grid-row ${isRelatedProduct ? 'related-product' : ''}`}>
            <div className="product-grid-column left-column">
                {(colorVariants.length > 0 || sizeVariantsWithImages.length > 0 || capacityVariantsWithImages.length > 0) && (
                    <div className="variants-container">
                        {colorVariants.map((color) => (
                            <div
                                key={`color-${color.name}`}
                                className={`variant-thumbnails ${selectedColor?.name === color.name ? 'active' : ''}`}
                            >
                                {color.image ? (
                                    <img
                                        src={color.image}
                                        alt={color.name}
                                        className="variant-thumbnail"
                                        onClick={() => handleColorChange(color)}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="color-thumbnail-text"
                                        onClick={() => handleColorChange(color)}
                                        style={{ backgroundColor: color.hex || '#ccc' }}
                                        title={color.name}
                                    />
                                )}
                            </div>
                        ))}

                        {sizeVariantsWithImages.map((size) => (
                            <div
                                key={`size-${size.value}`}
                                className={`variant-thumbnails ${selectedSize?.value === size.value ? 'active' : ''}`}
                            >
                                <img
                                    src={size.image}
                                    alt={size.value}
                                    className="variant-thumbnail"
                                    onClick={() => handleSizeChange(size)}
                                    loading="lazy"
                                />
                            </div>
                        ))}

                        {capacityVariantsWithImages.map((capacity) => (
                            <div
                                key={`capacity-${capacity.value}`}
                                className={`variant-thumbnails ${selectedCapacity?.value === capacity.value ? 'active' : ''}`}
                            >
                                <img
                                    src={capacity.image}
                                    alt={capacity.value}
                                    className="variant-thumbnail"
                                    onClick={() => handleCapacityChange(capacity)}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="product-image-container">
                    <img
                        src={mainImage || product?.mainimage}
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
                                            onClick={() => handleColorChange(color)}
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
                                            onClick={() => handleSizeChange(size)}
                                        >
                                            {size.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {capacityVariants.length > 0 && (
                            <div className="option-container">
                                <label className='option-name'>Character: <span className="option-span">{selectedCapacity?.value}</span></label>
                                <div className="option-variants">
                                    {capacityVariants.map((capacity) => (
                                        <span
                                            key={`capacity-btn-${capacity.value}`}
                                            className={`capacity-circle ${selectedCapacity?.value === capacity.value ? 'active' : ''}`}
                                            onClick={() => handleCapacityChange(capacity)}
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
                        <SocialShare
                            url={shareUrl}
                            title={shareTitle}
                            description={productDescription}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

export default ProductDetailCard;