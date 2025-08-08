import "../Product.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileFilterDropdown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory,
}) => {
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const slugify = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

  return (
    <div className="mobile-filter-dropdown">
      <button
        className="mobile-filter-toggle"
        onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
      >
        {selectedCategory}
        <span className="dropdown-arrow">{mobileCategoryOpen ? "▲" : "▼"}</span>
      </button>

      {mobileCategoryOpen && (
        <div className="mobile-category-list">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`mobile-category-item ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                setSelectedSubcategory(null);
                if (category.name === "All Categories") {
                  navigate("/catalog");
                } else {
                  navigate(`/catalog/${slugify(category.name)}`);
                }
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
