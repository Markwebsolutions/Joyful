import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setSelectedCategory, setSelectedSubcategory } from '../../../features/productsSlice';
import ProductDetailCard from './ProductDetailCard';
import ProductDetailsShimmer from './ProductDetailsShimmer';
import "./ProductDetails.css"

const RelatedProducts = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    // Get data from Redux store
    const {
        data: categories,
        loading,
        error
    } = useSelector((state) => state.products);

    // Local state for component-specific data
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [variantSelections, setVariantSelections] = useState({});

    // Fetch products if not already loaded
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        if (categories.length > 0) {
            // Flatten all products
            const allProducts = categories.flatMap(category =>
                category.subcategories.flatMap(subcategory =>
                    subcategory.products
                        .filter(product => product.isPublished !== false)
                        .map(product => ({
                            ...product,
                            category: category.name,
                            subcategory: subcategory.name,
                            subcategoryId: subcategory.id
                        }))
                )
            );

            // Find current product
            const foundProduct = allProducts.find(p => p.id === parseInt(productId));

            if (foundProduct) {
                setCurrentProduct(foundProduct);
                // Update Redux with current category/subcategory
                dispatch(setSelectedCategory(foundProduct.category));
                dispatch(setSelectedSubcategory(foundProduct.subcategory));

                // Get related products with filters
                const related = allProducts.filter(p =>
                    p.subcategoryId === foundProduct.subcategoryId &&
                    p.id !== parseInt(productId) &&
                    p.isPublished !== false &&
                    p.variantsMap?.Color?.length > 0
                );

                // Initialize variant selections for each related product
                const initialSelections = {};
                related.forEach(product => {
                    initialSelections[product.id] = {
                        color: product.variantsMap?.Color?.[0] || null,
                        size: product.variantsMap?.Size?.[0] || null,
                        capacity: product.variantsMap?.Capacity?.[0] || null,
                        currentImage: product.variantsMap?.Color?.[0]?.image || product.mainimage
                    };
                });

                setVariantSelections(initialSelections);
                setRelatedProducts(related);
            }
        }
    }, [productId, categories, dispatch]);

    const handleVariantChange = (productId, variantType, value) => {
        setVariantSelections(prev => {
            const newSelections = { ...prev };
            newSelections[productId] = {
                ...newSelections[productId],
                [variantType]: value
            };

            // Update current image when color changes
            if (variantType === 'color' && value?.image) {
                newSelections[productId].currentImage = value.image;
            }

            return newSelections;
        });
    };

    if (loading) return <div><ProductDetailsShimmer /> </div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentProduct) return <div>Product not found</div>;

    return (
        <section className="related-products-section section" data-testid="related-products">
            {relatedProducts.length > 0 ? (
                relatedProducts.map((product, index) => {
                    const selections = variantSelections[product.id] || {};
                    const colorVariants = product.variantsMap?.Color || [];
                    const sizeVariants = product.variantsMap?.Size || [];
                    const capacityVariants = product.variantsMap?.Capacity || [];

                    return (
                        <div
                            key={product.id}
                            className={`related-product-item ${index % 2 === 0 ? 'even' : 'odd'}`}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#F5EDDA' : '#F2F3FB'
                            }}
                        >
                            <div className="page-width">
                                <ProductDetailCard
                                    product={product}
                                    isCompact={true}
                                    selectedColor={selections.color}
                                    selectedSize={selections.size}
                                    selectedCapacity={selections.capacity}
                                    colorVariants={colorVariants}
                                    sizeVariants={sizeVariants}
                                    capacityVariants={capacityVariants}
                                    onColorChange={(color) => handleVariantChange(product.id, 'color', color)}
                                    onSizeChange={(size) => handleVariantChange(product.id, 'size', size)}
                                    onCapacityChange={(capacity) => handleVariantChange(product.id, 'capacity', capacity)}
                                    currentMainImage={selections.currentImage || product.mainimage}
                                    descriptionLines={product.description?.split('\n').filter(line => line.trim() !== '') || []}
                                />
                            </div>
                        </div>
                    );
                })
            ) : (<></>)}
        </section>
    );
};

export default RelatedProducts;