import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../../../features/productsSlice';
import './ProductDetails.css';
import "../Product.css";
import ProductDetailsShimmer from './ProductDetailsShimmer';
import Section5 from '../../homepage/Section5';
import ProductDetailCard from './ProductDetailCard';
import RelatedProducts from './RelatedProducts';

const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const {
        categories,
        data: allProducts,
        productDetails,
        status,
        error
    } = useSelector(state => state.products);

    const product = productDetails[productId];

    const { variants, colorVariants, sizeVariants, capacityVariants } = useMemo(() => {
        if (!product) return { variants: {}, colorVariants: [], sizeVariants: [], capacityVariants: [] };

        try {
            const variants = product.variantsMap ? JSON.parse(product.variantsMap) : {};
            return {
                variants,
                colorVariants: variants.Color || [],
                sizeVariants: variants.Size || [],
                capacityVariants: variants.Capacity || []
            };
        } catch (e) {
            console.error('Error parsing variants:', e);
            return { variants: {}, colorVariants: [], sizeVariants: [], capacityVariants: [] };
        }
    }, [product]);

    const [selectedColor, setSelectedColor] = useState(colorVariants[0] || null);
    const [selectedSize, setSelectedSize] = useState(sizeVariants[0] || null);
    const [selectedCapacity, setSelectedCapacity] = useState(capacityVariants[0] || null);

    useEffect(() => {
        if (!product && status !== 'loading') {
            dispatch(fetchProductDetails(productId));
        }
    }, [productId, dispatch, product, status]);

    const { currentCategory, subcategoryProducts } = useMemo(() => {
        if (!product || !categories.length || !allProducts.length) {
            return { currentCategory: null, subcategoryProducts: [] };
        }

        const currentCategory = categories.find(cat =>
            cat.name !== 'All Categories' &&
            allProducts.some(p => p.id === product.id && p.category === cat.name)
        );

        if (!currentCategory) return { currentCategory: null, subcategoryProducts: [] };

        const seenSubcategories = new Set();
        const subcategoryProducts = allProducts
            .filter(p => p.category === currentCategory.name)
            .filter(p => {
                if (!seenSubcategories.has(p.subcategory)) {
                    seenSubcategories.add(p.subcategory);
                    return true;
                }
                return false;
            });

        return { currentCategory, subcategoryProducts };
    }, [product, categories, allProducts]);

    const currentMainImage = selectedColor?.image || selectedSize?.image || selectedCapacity?.image || product?.mainimage || '';
    const descriptionLines = useMemo(() =>
        product?.description?.split('\n').filter(line => line.trim() !== '') || [],
        [product]
    );

    const handleColorChange = useCallback((color) => setSelectedColor(color), []);
    const handleSizeChange = useCallback((size) => setSelectedSize(size), []);
    const handleCapacityChange = useCallback((capacity) => setSelectedCapacity(capacity), []);

    if (status === 'loading' || !product) return <ProductDetailsShimmer />;
    if (error) return <div className="page-width error-message">Error: {error}</div>;

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

            {subcategoryProducts.length > 0 && (
                <RelatedProducts
                    products={subcategoryProducts}
                    categoryName={currentCategory?.name}
                />
            )}

            <Section5 />
        </>
    );
};

export default ProductDetails;  