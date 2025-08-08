import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Product.css";
const ProductGridCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    const slugify = (text) =>
      text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
    navigate(
      `/catalog/${slugify(product.category)}/${slugify(
        product.subcategory
      )}/${slugify(product.name)}`
    );
  }, [navigate, product.id]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const slugify = (text) =>
          text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
        navigate(
          `/catalog/${slugify(product.category)}/${slugify(
            product.subcategory
          )}/${slugify(product.name)}`
        );
      }
    },
    [navigate, product.id]
  );
  const renderVariantOptions = (variantType) => {
    if (!product.variantsMap?.[variantType]?.length) return null;
    return (
      <div className="card-options">
        {product.variantsMap[variantType].map((variant, i) => {
          if (variantType === "Color") {
            return (
              <span
                key={i}
                className="color-circle-card"
                style={{
                  backgroundColor: variant.hex || "#ccc",
                  borderColor: variant.hex ? "#ddd" : "#999",
                }}
                title={variant.name}
              />
            );
          } else {
            return (
              <span key={i} className="size-option-card">
                {variant.value || variant.name}
              </span>
            );
          }
        })}
      </div>
    );
  };
  return (
    <div
      className="product-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="card-image-container">
        <img
          src={product.mainimage}
          alt={product.name}
          className="card-image main-image"
          loading="lazy"
        />
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
        {/* Visual representation of variants only */}
        <div className="product-variants">
          {renderVariantOptions("Color")}
          {renderVariantOptions("Size")}
          {renderVariantOptions("Capacity")}
        </div>
      </div>
    </div>
  );
};
export default ProductGridCard;
