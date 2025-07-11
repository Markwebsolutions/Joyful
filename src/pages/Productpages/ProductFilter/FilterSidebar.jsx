import { useState } from 'react';
import tick from "../../../assets/product_page/tick.svg";
import box from "../../../assets/product_page/box.svg";
import "../Product.css";

const FilterSidebar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
}) => {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
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
                                    setActiveCategory(activeCategory === index ? null : index);
                                    setSelectedCategory(category.name);
                                    setSelectedSubcategory(null);
                                }}
                            >
                                {category.subcategories.length > 0 && (
                                    <img
                                        src={activeCategory === index ? tick : box}
                                        alt="icon"
                                        className="box-tick-icon"
                                    />
                                )}
                                {category.name}
                                {category.subcategories.length > 0 && (
                                    <span className="dropdown-icon-container">
                                        {category.imagelink && (
                                            <img
                                                src={category.imagelink}
                                                alt={category.name}
                                                className="category-image"
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
                                            onClick={() => setSelectedSubcategory(subcategory)}
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
    );
};

export default FilterSidebar;