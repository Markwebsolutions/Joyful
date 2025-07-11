import "../Product.css";
import { useState } from 'react';

const MobileFilterDropdown = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory
}) => {
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

    return (
        <div className="mobile-filter-dropdown">
            <button
                className="mobile-filter-toggle"
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
            >
                {selectedCategory}
                <span className="dropdown-arrow">{mobileCategoryOpen ? '▲' : '▼'}</span>
            </button>
            {mobileCategoryOpen && (
                <div className="mobile-category-list">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`mobile-category-item ${selectedCategory === category.name ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedCategory(category.name);
                                setSelectedSubcategory(null);
                                setMobileCategoryOpen(false);
                            }}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileFilterDropdown;