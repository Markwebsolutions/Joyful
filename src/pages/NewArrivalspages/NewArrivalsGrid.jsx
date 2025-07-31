import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import
import { fetchProducts } from '../../features/productsSlice';
import './NewArrivals.css';

const NewArrivalsGrid = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the navigate function
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
                <div className="new-arrival-variants shimmer-bg" style={{ width: '100%', height: '40px', marginTop: '12px' }}></div>
            </div>
        </div>
    );

    // Extract and filter new arrival products that are published
    const newArrivalProducts = [];
    categories?.forEach(category => {
        category.subcategories?.forEach(subcategory => {
            subcategory.products?.forEach(product => {
                if (product.newarrival && product.ispublished) {
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

    // Handle card click
    const handleCardClick = (productId) => {
        navigate(`/catalog/${productId}`);
    };

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
                        onClick={() => handleCardClick(product.id)} // Add click handler
                        style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
                    >
                        {/* Product Image */}
                        <div className="new-arrival-image-container">
                            <img
                                src={product.mainimage || 'https://via.placeholder.com/300'}
                                alt={product.name}
                                className="new-arrival-image"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="new-arrival-info">
                            <h3 className="new-arrival-name">{product.name}</h3>

                            {/* Variants */}
                            <div className="new-arrival-variants">
                                {/* Color variants - shown as circles */}
                                {product.variantsMap?.Color && (
                                    <div className="new-arrival-variant-group">
                                        {product.variantsMap.Color.map((color, index) => (
                                            <span
                                                key={index}
                                                className="new-arrival-color-circle"
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Size variants - shown as squares */}
                                {product.variantsMap?.Size && (
                                    <div className="new-arrival-variant-group">
                                        {product.variantsMap.Size.map((size, index) => (
                                            <span
                                                key={index}
                                                className="new-arrival-size-square"
                                                title={size.value}
                                            >
                                                {size.value}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Capacity variants - shown as rounded squares */}
                                {product.variantsMap?.Capacity && (
                                    <div className="new-arrival-variant-group">
                                        {product.variantsMap.Capacity.map((capacity, index) => (
                                            <span
                                                key={index}
                                                className="new-arrival-capacity-rounded"
                                                title={capacity.value}
                                            >
                                                {capacity.value}
                                            </span>
                                        ))}
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