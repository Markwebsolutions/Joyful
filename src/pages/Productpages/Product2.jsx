import '../Productpages/Product.css';
import { useState } from 'react';
import data from "../../data/data.json"
import tick from "../../assets/product_page/tick.svg";
import box from "../../assets/product_page/box.svg";

const Product2 = () => {
    // Extract products from data.json
    const allProducts = data.flatMap(category =>
        category.subcategories.flatMap(subcategory =>
            subcategory.products ? subcategory.products.map(product => ({
                ...product,
                category: category.name,
                subcategory: subcategory.name
            })) : []
        )
    );

    // Extract categories and subcategories from data.json
    const categories = [
        {
            name: 'All Categories',
            subcategories: []
        },
        ...data.map(category => ({
            name: category.name,
            subcategories: category.subcategories.map(sub => sub.name)
        }))
    ];

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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
    };

    // Filter products based on selection
    const filteredProducts = allProducts.filter(product => {
        if (selectedCategory === 'All Categories') return true;
        if (selectedSubcategory) {
            return product.category === selectedCategory && product.subcategory === selectedSubcategory;
        }
        return product.category === selectedCategory;
    });

    return (
        <div className="page-width">
            <div className="product-container my-20">
                {/* Filter header and left navigation sidebar */}
                <div className="filter-nav-container">
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

                {/* Right product cards section */}
                <div className="product-content">
                    <div className="product-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="card-image-container">
                                        <img
                                            src={product.mainimage || product.imagelink}
                                            alt={product.name}
                                            className="card-image"
                                        />
                                    </div>
                                    <div className="card-info">
                                        <h3 className="card-title">{product.name}</h3>
                                        {product.price && (
                                            <p className="card-price">${product.price.toFixed(2)}</p>
                                        )}
                                        {/* <button className="card-button">Add to Cart</button> */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-products">
                                No products found in this category
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product2;