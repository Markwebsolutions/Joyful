import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Product.css";

const ProductGridCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/catalog/${product.id}`);
    }, [navigate, product.id]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            navigate(`/catalog/${product.id}`);
        }
    }, [navigate, product.id]);

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
                {product.price && (
                    <p className="card-price">${product.price.toFixed(2)}</p>
                )}
                <div className="product-variants">
                    {product.variants?.Size?.length > 0 && (
                        <div className="card-options">
                            {product.variants.Size.map((size, i) => (
                                <span key={i}
                                    className="size-option-card">
                                    {size.value}
                                </span>
                            ))}
                        </div>
                    )}
                    {product.variants?.Color?.length > 0 && (
                        <div className="card-options">
                            {product.variants.Color.map((color, i) => (
                                <span
                                    key={i}
                                    className="color-circle-card"
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
    );
};

export default ProductGridCard;