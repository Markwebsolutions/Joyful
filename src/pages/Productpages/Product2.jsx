import '../Productpages/Product.css';
import { useState, useEffect } from 'react';
import tick from "../../assets/product_page/tick.svg";
import box from "../../assets/product_page/box.svg";
import ProductShimmer from './ProductShimmer';

const Product2 = () => {
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://joyful-backend-backend-production.up.railway.app/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Process categories and subcategories
                const processedCategories = [
                    {
                        name: 'All Categories',
                        subcategories: []
                    },
                    ...data.map(category => ({
                        ...category,
                        subcategories: category.subcategories.map(sub => sub.name)
                    }))
                ];

                // Process all products
                const processedProducts = data.flatMap(category =>
                    category.products.map(product => ({
                        ...product,
                        category: category.name,
                        subcategory: category.subcategories[0]?.name || '',
                        variants: product.variantsMap ? JSON.parse(product.variantsMap) : {}
                    }))
                );

                setCategories(processedCategories);
                setAllProducts(processedProducts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleCategory = (index) => {
        if (activeCategory === index) {
            setActiveCategory(null);
        } else {
            setActiveCategory(index);
        }
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryClick = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
        // Close mobile filters after selection
        if (window.innerWidth <= 768) {
            setShowMobileFilters(false);
        }
    };

    // Filter products based on selection
    const filteredProducts = allProducts.filter(product => {
        if (selectedCategory === 'All Categories') return true;
        if (selectedSubcategory) {
            return product.category === selectedCategory && product.subcategory === selectedSubcategory;
        }
        return product.category === selectedCategory;
    });

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="product-container my-20">
                {/* Mobile filter toggle button */}
                <button
                    className="mobile-filter-toggle"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                    {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filter header and left navigation sidebar */}
                <div className={`filter-nav-container ${showMobileFilters ? 'mobile-visible' : ''}`}>
                    <div className="filter-header">
                        <h3 className="nav-title">FILTER BY</h3>
                    </div>
                    <div className="product-nav">
                        <ul className="nav-list">
                            {categories.map((category, index) => (
                                <li key={index} className="nav-category">
                                    <div
                                        className={`category-header ${activeCategory === index ? 'active' : ''} ${selectedCategory === category.name && !selectedSubcategory ? 'selected' : ''}`}
                                        onClick={() => {
                                            toggleCategory(index);
                                            handleCategoryClick(category.name);
                                        }}
                                    >
                                        {/* Box/Tick icon */}
                                        {category.subcategories.length > 0 ? (
                                            activeCategory === index ? (
                                                <img src={tick} alt="tick" className="box-tick-icon" style={{ marginRight: '8px' }} />
                                            ) : (
                                                <img src={box} alt="box" className="box-tick-icon" style={{ marginRight: '8px' }} />
                                            )
                                        ) : null}

                                        {category.name}

                                        {/* Category image and dropdown icon */}
                                        {category.subcategories.length > 0 && (
                                            <span className="dropdown-icon-container">
                                                {/* Show category image if available */}
                                                {category.imagelink && (
                                                    <img
                                                        src={category.imagelink}
                                                        alt={category.name}
                                                        className="category-image"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            marginRight: '8px',
                                                            borderRadius: '2px'
                                                        }}
                                                    />
                                                )}
                                                <span className="dropdown-icon">
                                                    {activeCategory === index ? '−' : '+'}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    {activeCategory === index && category.subcategories.length > 0 && (
                                        <ul className="subcategory-list">
                                            {category.subcategories.map((subcategory, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className={`subcategory-item ${selectedSubcategory === subcategory ? 'selected' : ''}`}
                                                    onClick={() => handleSubcategoryClick(subcategory)}
                                                >
                                                    {subcategory}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right product cards section - Show shimmer when loading or no products */}
                {loading ? (
                    <ProductShimmer />
                ) : filteredProducts.length === 0 ? (
                    <div className="product-content">
                        <div className="no-products">
                            No products found in this category
                        </div>
                    </div>
                ) : (
                    <div className="product-content">
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="card-image-container">
                                        {/* Main Image */}
                                        <img
                                            src={product.mainimage}
                                            alt={product.name}
                                            className="card-image main-image"
                                            loading="lazy"
                                        />

                                        {/* Hover Image - only render if hoverimage exists */}
                                        {product.hoverimage && (
                                            <img
                                                src={product.hoverimage}
                                                alt={product.name}
                                                className="card-image hover-image"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <div className="card-info">
                                        <h3 className="card-title">{product.name}</h3>
                                        {product.price && (
                                            <p className="card-price">${product.price.toFixed(2)}</p>
                                        )}

                                        {/* Display variants (size and color) */}
                                        <div className="product-variants">
                                            {product.variants.Size && product.variants.Size.length > 0 && (
                                                <div className="variant-section">
                                                    <div className="size-options">
                                                        {product.variants.Size.map((size, i) => (
                                                            <span key={i} className="size-option">
                                                                {size.value}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {product.variants.Color && product.variants.Color.length > 0 && (
                                                <div className="variant-section">
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
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product2;