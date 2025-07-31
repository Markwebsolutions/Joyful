import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import './NewArrivals.css';

const NewArrivalsGrid = () => {
    const dispatch = useDispatch();
    const { data: categories, loading, error } = useSelector((state) => state.products);
    const [sortOption, setSortOption] = useState('newest');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Shimmer loading component
    const ShimmerCard = () => (
        <div className="new-arrival-card shimmer">
            <div className="new-arrival-image-container shimmer-bg"></div>
            <div className="new-arrival-info">
                <div className="new-arrival-name shimmer-bg" style={{ width: '80%', height: '20px' }}></div>
                <div className="new-arrival-price shimmer-bg" style={{ width: '40%', height: '16px', marginTop: '8px' }}></div>
                <div className="new-arrival-variants">
                    <div className="new-arrival-variant-group">
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="shimmer-bg" style={{ width: '20px', height: '20px', borderRadius: '50%' }}></div>
                            ))}
                        </div>
                    </div>
                    <div className="new-arrival-variant-group" style={{ marginTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="shimmer-bg" style={{ width: '24px', height: '24px', borderRadius: '3px' }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Extract and sort new arrival products
    const newArrivalProducts = [];
    categories?.forEach(category => {
        category.subcategories?.forEach(subcategory => {
            subcategory.products?.forEach(product => {
                if (product.newarrival) {
                    newArrivalProducts.push(product);
                }
            });
        });
    });

    // Sort products based on selected option
    const sortedProducts = [...newArrivalProducts].sort((a, b) => {
        switch (sortOption) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    if (error) {
        return <div className="new-arrival-error">Error: {error}</div>;
    }

    if (loading) {
        return (
            <div className="new-arrival-container">
                <div className="new-arrival-header">
                    <div className="new-arrival-sort shimmer-bg" style={{ width: '200px', height: '36px', borderRadius: '4px' }}></div>
                </div>
                <div className="new-arrival-grid">
                    {[...Array(8)].map((_, i) => (
                        <ShimmerCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (newArrivalProducts.length === 0) {
        return <div className="new-arrival-empty">No new arrivals found</div>;
    }

    return (
        <div className="new-arrival-container">
            <div className="new-arrival-header">
                <div className="new-arrival-sort">
                    <label htmlFor="sort-select" className="new-arrival-sort-label">Sort by:</label>
                    <select
                        id="sort-select"
                        className="new-arrival-sort-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </select>
                </div>
            </div>

            <div className="new-arrival-grid">
                {sortedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="new-arrival-card"
                    >
                        {/* Product Image */}
                        <div className="new-arrival-image-container">
                            <img
                                src={product.mainimage || 'https://via.placeholder.com/300'}
                                alt={product.name}
                                className="new-arrival-image new-arrival-main-image"
                            />
                            {product.hoverimage && (
                                <img
                                    src={product.hoverimage}
                                    alt={product.name}
                                    className="new-arrival-image new-arrival-hover-image"
                                />
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="new-arrival-info">
                            <h3 className="new-arrival-name">{product.name}</h3>
                            {/* Variants */}
                            <div className="new-arrival-variants">
                                {/* Color Variants */}
                                {product.variantsMap?.Color && (
                                    <div className="new-arrival-variant-group">
                                        <div className="new-arrival-color-options">
                                            {product.variantsMap.Color.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="new-arrival-color-circle"
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Variants */}
                                {product.variantsMap?.Size && product.variantsMap.Size.length > 0 && (
                                    <div className="new-arrival-variant-group">
                                        <div className="new-arrival-size-options">
                                            {product.variantsMap.Size.map((size, index) => (
                                                <span
                                                    key={index}
                                                    className="new-arrival-size-option"
                                                    title={size.value}
                                                >
                                                    {size.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Capacity Variants */}
                                {product.variantsMap?.Capacity && product.variantsMap.Capacity.length > 0 && (
                                    <div className="new-arrival-variant-group">
                                        <div className="new-arrival-capacity-options">
                                            {product.variantsMap.Capacity.map((capacity, index) => (
                                                <span
                                                    key={index}
                                                    className="new-arrival-capacity-option"
                                                    title={capacity.value}
                                                >
                                                    {capacity.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivalsGrid;