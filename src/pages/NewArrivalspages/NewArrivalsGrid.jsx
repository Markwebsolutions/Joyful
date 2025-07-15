import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import NewArrivalCard from './NewArrivalCard';
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

const ITEMS_PER_PAGE = 12; // Number of items to load each time

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
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
    const loaderRef = useRef(null);
    const containerRef = useRef(null);

    // Memoized new arrival products
    const newArrivalProducts = useMemo(() => {
        return allProducts.filter(product => product.newarrival);
    }, [allProducts]);

    // Memoized sorted products
    const filteredProducts = useMemo(() => {
        return [...newArrivalProducts].sort(sortFunctions[sortOption] || (() => 0));
    }, [newArrivalProducts, sortOption]);

    // Products to display (only the visible ones)
    const displayProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleItems);
    }, [filteredProducts, visibleItems]);

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

    // Reset visible items when sort option changes
    useEffect(() => {
        setVisibleItems(ITEMS_PER_PAGE);
    }, [sortOption]);

    // Infinite scroll implementation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleItems < filteredProducts.length) {
                    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
                }
            },
            { threshold: 0.1, root: containerRef.current }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [visibleItems, filteredProducts.length]);

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
        <div className="page-width" ref={containerRef}>
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
                    <>
                        <div className="new-arrivals-grid">
                            {displayProducts.map((product) => (
                                <NewArrivalCard
                                    key={product.id}
                                    product={product}
                                    onClick={handleProductClick}
                                    onKeyDown={handleKeyDown}
                                />
                            ))}
                        </div>
                        {/* Loading indicator at the bottom */}
                        {visibleItems < filteredProducts.length && (
                            <div ref={loaderRef} className="loading-indicator">
                                <ProductShimmer count={4} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewArrivalsPage;