import "../Product.css";

const ProductGridCard = ({ product }) => (
    <div className="product-card">
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
);

export default ProductGridCard;