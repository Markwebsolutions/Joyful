import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ProductDetailsShimmer from './ProductDetailsShimmer';
import ProductDetailCard from './ProductDetailCard';
import RelatedProducts from './RelatedProducts';
import Section5 from '../../homepage/Section5';
import FeedBack from '../feedback/FeedBack';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://joyfulbackend-production.up.railway.app/products/${productId}`);
                const data = await response.json();

                if (data.isPublished !== false) {
                    setProduct(data);
                } else {
                    setError('Product not found or not published');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const { variants, colorVariants, sizeVariants, capacityVariants } = useMemo(() => {
        if (!product) return { variants: {}, colorVariants: [], sizeVariants: [], capacityVariants: [] };

        const variants = product.variantsMap || {};
        return {
            variants,
            colorVariants: variants.Color || [],
            sizeVariants: variants.Size || [],
            capacityVariants: variants.Capacity || []
        };
    }, [product]);

    const [selectedColor, setSelectedColor] = useState(colorVariants[0] || null);
    const [selectedSize, setSelectedSize] = useState(sizeVariants[0] || null);
    const [selectedCapacity, setSelectedCapacity] = useState(capacityVariants[0] || null);

    const currentMainImage = selectedColor?.image || product?.mainimage || '';
    const descriptionLines = useMemo(() =>
        product?.description?.split('\n').filter(line => line.trim() !== '') || [],
        [product]
    );

    const handleColorChange = useCallback((color) => setSelectedColor(color), []);
    const handleSizeChange = useCallback((size) => setSelectedSize(size), []);
    const handleCapacityChange = useCallback((capacity) => setSelectedCapacity(capacity), []);

    if (loading) return <ProductDetailsShimmer />;
    if (error) return <div className="page-width error-message">Error: {error}</div>;
    if (!product) return <div className="page-width error-message">Product not found</div>;

    return (
        <>
            <section className="product-details-section section-alt">
                <div className="page-width">
                    <div className="breadcrumb">Home / {product.name}</div>
                    <ProductDetailCard
                        product={product}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                        selectedCapacity={selectedCapacity}
                        colorVariants={colorVariants}
                        sizeVariants={sizeVariants}
                        capacityVariants={capacityVariants}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                        onCapacityChange={handleCapacityChange}
                        currentMainImage={currentMainImage}
                        descriptionLines={descriptionLines}
                    />
                </div>
            </section>

            <RelatedProducts />
            <FeedBack />
            <Section5 />
        </>

    );
};

export default ProductDetails;