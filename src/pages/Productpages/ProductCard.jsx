import React from 'react';
// import '../Productpages/Product.css';
import "../Productpages"
const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="card-image-container">
                <img
                    src={product.mainimage}
                    alt={product.name}
                    className="card-image"
                    loading="lazy"
                />
            </div>
            <div className="card-info">
                <h3 className="card-title">{product.name}</h3>
                {product.price && (
                    <p className="card-price">${product.price.toFixed(2)}</p>
                )}

                {/* Display variants (size and color) */}
                <div className="product-variants">
                    {product.variants.Size?.length > 0 && (
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

                    {product.variants.Color?.length > 0 && (
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
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mainimage: PropTypes.string.isRequired,
        price: PropTypes.number,
        variants: PropTypes.shape({
            Size: PropTypes.array,
            Color: PropTypes.array
        })
    }).isRequired
};

export default React.memo(ProductCard);