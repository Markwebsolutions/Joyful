import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewArrivals.css';
import ProductShimmer from "../Productpages/ProductShimmer";

const sortFunctions = {
    newest: (a, b) => b.dateAdded - a.dateAdded,
    oldest: (a, b) => a.dateAdded - b.dateAdded,
    'price-low': (a, b) => (a.price || 0) - (b.price || 0),
    'price-high': (a, b) => (b.price || 0) - (a.price || 0),
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name)
};

const NewArrivalsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('newest');
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch('https://joyful-backend-backend-final-4-production.up.railway.app/categories');
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            const newArrivalProducts = data
                .filter(category => category.published)
                .flatMap(category =>
                    category.subcategories
                        ?.filter(sub => sub.ispublished)
                        ?.flatMap(sub =>
                            sub.products
                                ?.filter(product => product.ispublished && product.newarrival)
                                ?.map(product => ({
                                    ...product,
                                    variants: product.variantsMap ? JSON.parse(product.variantsMap) : {},
                                    dateAdded: new Date(product.createdAt || Date.now())
                                }))
                        ) || []
                );

            setProducts(newArrivalProducts);
            setFilteredProducts(newArrivalProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const sorted = [...products].sort(sortFunctions[sortOption] || (() => 0));
        setFilteredProducts(sorted);
    }, [sortOption, products]);

    const handleProductClick = (id) => {
        navigate(`/catalog/${id}`);
    };

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            navigate(`/catalog/${id}`);
        }
    };

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="new-arrivals-container ">
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

                {loading ? (
                    <ProductShimmer />
                ) : filteredProducts.length === 0 ? (
                    <div className="no-products">No products found</div>
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
                                        {product.variants.Size?.length > 0 && (
                                            <div className="size-options">
                                                {product.variants.Size.map((size, i) => (
                                                    <span key={i} className="size-option">
                                                        {size.value}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {product.variants.Color?.length > 0 && (
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