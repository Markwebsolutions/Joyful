import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import './NewArrivals.css';
import ProductShimmer from "../Productpages/ProductShimmer";

const sortFunctions = {
    newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    'price-low': (a, b) => (a.price || 0) - (b.price || 0),
    'price-high': (a, b) => (b.price || 0) - (a.price || 0),
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name)
};

const NewArrivalsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        data: allProducts,
        status,
        error,
        lastFetch
    } = useSelector(state => state.products);

    const [sortOption, setSortOption] = useState('newest');
    const [localLoading, setLocalLoading] = useState(true);

    // Memoized new arrival products
    const newArrivalProducts = useMemo(() => {
        return allProducts.filter(product => product.newarrival);
    }, [allProducts]);

    // Memoized sorted products
    const filteredProducts = useMemo(() => {
        return [...newArrivalProducts].sort(sortFunctions[sortOption] || (() => 0));
    }, [newArrivalProducts, sortOption]);

    // Fetch products if needed
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }

        // Hide loading indicator once we have data
        if (status === 'succeeded') {
            setLocalLoading(false);
        }
    }, [status, dispatch]);

    const handleProductClick = useCallback((id) => {
        navigate(`/catalog/${id}`);
    }, [navigate]);

    const handleKeyDown = useCallback((e, id) => {
        if (e.key === 'Enter') {
            navigate(`/catalog/${id}`);
        }
    }, [navigate]);

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="new-arrivals-container">
                <div className="new-arrivals-header">
                    <div className="sort-filter-container">
                        <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                        <select
                            id="sort-select"
                            className="sort-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {Object.entries({
                                newest: 'Newest First',
                                oldest: 'Oldest First',
                                'price-low': 'Price: Low to High',
                                'price-high': 'Price: High to Low',
                                'name-asc': 'Name: A to Z',
                                'name-desc': 'Name: Z to A'
                            }).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {(status === 'loading' || localLoading) ? (
                    <ProductShimmer />
                ) : filteredProducts.length === 0 ? (
                    <div className="no-products">No new arrival products found</div>
                ) : (
                    <div className="new-arrivals-grid">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="new-arrivals-card"
                                onClick={() => handleProductClick(product.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, product.id)}
                            >
                                <div className="new-arrivals-image-container">
                                    <img
                                        src={product.mainimage}
                                        alt={product.name}
                                        className="new-arrivals-image main-image"
                                        loading="lazy"
                                    />
                                    {product.hoverimage && (
                                        <img
                                            src={product.hoverimage}
                                            alt={product.name}
                                            className="new-arrivals-image hover-image"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                <div className="new-arrivals-info">
                                    <h3 className="new-arrivals-name">{product.name}</h3>
                                    {product.price && (
                                        <p className="new-arrivals-price">${product.price.toFixed(2)}</p>
                                    )}
                                    <div className="new-arrivals-variants">
                                        {product.variants?.Size?.length > 0 && (
                                            <div className="size-options">
                                                {product.variants.Size.map((size, i) => (
                                                    <span key={i} className="size-option">
                                                        {size.value}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {product.variants?.Color?.length > 0 && (
                                            <div className="color-options">
                                                {product.variants.Color.map((color, i) => (
                                                    <span
                                                        key={i}
                                                        className="color-circle"
                                                        style={{
                                                            backgroundColor: color.hex || '#ccc',
                                                            borderColor: color.hex ? '#ddd' : '#999'
                                                        }}
                                                        title={color.name}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewArrivalsPage;