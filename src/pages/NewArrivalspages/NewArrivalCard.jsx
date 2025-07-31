import PropTypes from 'prop-types';
import "./NewArrivals.css"

const NewArrivalCard = ({ product, onClick, onKeyDown }) => {
    return (
        <div
            className="new-arrivals-card"
            onClick={() => onClick(product.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => onKeyDown(e, product.id)}
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
                    {product.variants?.Size?.length > 0 && (
                        <div className="size-options">
                            {product.variants.Size.map((size, i) => (
                                <span key={i} className="size-option">
                                    {size.value}
                                </span>
                            ))}
                        </div>
                    )}
                    {product.variants?.Color?.length > 0 && (
                        <div className="color-options">
                            {product.variants.Color.map((color, i) => (
                                <span
                                    key={i}
                                    className="newarrival-color-circle"
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

NewArrivalCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mainimage: PropTypes.string.isRequired,
        hoverimage: PropTypes.string,
        price: PropTypes.number,
        variants: PropTypes.shape({
            Size: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired
                })
            ),
            Color: PropTypes.arrayOf(
                PropTypes.shape({
                    hex: PropTypes.string,
                    name: PropTypes.string.isRequired
                })
            )
        })
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired
};

export default NewArrivalCard;