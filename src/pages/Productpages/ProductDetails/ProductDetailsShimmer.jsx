import './ProductDetails.css';
import "../Product.css";

const ProductDetailsShimmer = () => {
    return (
        <section className="product-details-section">
            <div className="page-width">
                <div className="breadcrumb shimmer" style={{ width: '200px', height: '16px' }}></div>

                <div className="product-grid-row">
                    <div className="product-grid-column left-column">
                        <div className="variants-container">
                            {/* Color variant shimmers */}                            {/* Size variant shimmers */}
                            {[...Array(5)].map((_, i) => (
                                <div key={`size-shimmer-${i}`} className="variant-thumbnails shimmer" style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div className="shimmer" style={{
                                        width: '60%',
                                        height: '20px',
                                        borderRadius: '4px'
                                    }}></div>
                                </div>
                            ))}
                        </div>

                        <div className="product-image-container shimmer" style={{ height: '500px' }}></div>
                    </div>

                    <div className="product-grid-column right-column">
                        <div className="product-info">
                            <div className="shimmer" style={{
                                height: '36px',
                                width: '70%',
                                marginBottom: '24px'
                            }}></div>

                            {/* Color option shimmer */}
                            <div className="shimmer" style={{
                                height: '20px',
                                width: '25%',
                                marginBottom: '12px'
                            }}></div>
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '24px',
                                flexWrap: 'wrap'
                            }}>
                                {[...Array(4)].map((_, i) => (
                                    <div key={`color-option-shimmer-${i}`} className="shimmer" style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%'
                                    }}></div>
                                ))}
                            </div>

                            {/* Size option shimmer */}
                            <div className="shimmer" style={{
                                height: '20px',
                                width: '25%',
                                marginBottom: '12px'
                            }}></div>
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '24px',
                                flexWrap: 'wrap'
                            }}>
                                {[...Array(5)].map((_, i) => (
                                    <div key={`size-option-shimmer-${i}`} className="shimmer" style={{
                                        width: '80px',
                                        height: '40px',
                                        borderRadius: '4px'
                                    }}></div>
                                ))}
                            </div>

                            <div className="shimmer" style={{
                                height: '60px',
                                width: '100%',
                                marginBottom: '30px',
                                borderRadius: '3rem'
                            }}></div>

                            <div className="product-description-shimmer">
                                <div className="shimmer" style={{
                                    height: '25px',
                                    width: '120px',
                                    marginBottom: '15px'
                                }}></div>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="shimmer" style={{
                                        height: '16px',
                                        width: `${100 - (i * 10)}%`,
                                        marginBottom: '10px'
                                    }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsShimmer;