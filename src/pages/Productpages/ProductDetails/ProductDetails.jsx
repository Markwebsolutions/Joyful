import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../../../features/productsSlice';
import './ProductDetails.css';
import "../Product.css";
import ProductDetailsShimmer from './ProductDetailsShimmer';

const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { productDetails, status, error } = useSelector(state => state.products);
    const product = productDetails[productId];

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);

    // Memoized variants data
    const { variants, colorVariants, sizeVariants } = useMemo(() => {
        if (!product) return { variants: {}, colorVariants: [], sizeVariants: [] };

        const variants = product.variantsMap ? JSON.parse(product.variantsMap) : {};
        return {
            variants,
            colorVariants: variants.Color || [],
            sizeVariants: variants.Size || []
        };
    }, [product]);

    // Memoized main image
    const currentMainImage = useMemo(() => {
        if (!product) return '';
        if (selectedColor?.image) return selectedColor.image;
        if (selectedSize?.image) return selectedSize.image;
        return product.mainimage;
    }, [product, selectedColor, selectedSize]);

    // Memoized description lines
    const descriptionLines = useMemo(() => {
        return product?.description
            ? product.description.split('\n').filter(line => line.trim() !== '')
            : [];
    }, [product]);

    // Fetch product details when needed
    useEffect(() => {
        if (!product || status === 'idle') {
            dispatch(fetchProductDetails(productId));
        }

        if (status === 'succeeded' && product) {
            setLocalLoading(false);

            // Set initial selected variants
            if (variants.Color?.length > 0) {
                setSelectedColor(variants.Color[0]);
            }
            if (variants.Size?.length > 0) {
                setSelectedSize(variants.Size[0]);
            }
        }
    }, [productId, product, status, dispatch, variants]);

    const handleColorChange = useCallback((color) => {
        setSelectedColor(color);
    }, []);

    const handleSizeChange = useCallback((size) => {
        setSelectedSize(size);
    }, []);

    if (localLoading || status === 'loading') return <ProductDetailsShimmer />;
    if (error) return <div className="page-width error-message">Error: {error}</div>;
    if (!product) return <div className="page-width">Product not found</div>;

    return (
        <section className="product-details-section">
            <div className="page-width">
                <div className="breadcrumb">Home / {product.name}</div>

                <div className="product-grid-row">
                    <div className="product-grid-column left-column">
                        {(colorVariants.length > 0 || sizeVariants.length > 0) && (
                            <div className="variants-container">
                                {colorVariants.map((color, index) => (
                                    <div key={`color-${index}`} className="variant-thumbnails">
                                        <img
                                            src={color.image}
                                            alt={color.name}
                                            className={`variant-thumbnail ${selectedColor?.name === color.name ? 'active' : ''}`}
                                            onClick={() => handleColorChange(color)}
                                            loading="lazy"
                                        />
                                    </div>
                                ))}

                                {sizeVariants.map((size, index) => (
                                    <div
                                        key={`size-${index}`}
                                        className={`variant-thumbnails ${selectedSize?.value === size.value ? 'active' : ''}`}
                                        onClick={() => handleSizeChange(size)}
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
                                        {colorVariants.map((color, index) => (
                                            <span
                                                key={`color-btn-${index}`}
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
                                <div className="size-option">
                                    <label>Size: <span className="selected-size">{selectedSize?.value}</span></label>
                                    <div className="size-options">
                                        {sizeVariants.map((size, index) => (
                                            <span
                                                key={`size-btn-${index}`}
                                                className={`size-option ${selectedSize?.value === size.value ? 'active' : ''}`}
                                                onClick={() => handleSizeChange(size)}
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
                                    <p key={index} style={{ fontSize: '14px' }}>
                                        {line.replace(/<[^>]*>/g, '')}
                                    </p>
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
            </div>
        </section>
    );
};

export default ProductDetails;