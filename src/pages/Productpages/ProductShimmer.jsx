

const ProductShimmer = () => {
    return (
        <div className="product-content">
            <div className="product-grid">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="product-card shimmer">
                        <div className="card-image-container shimmer-bg"></div>
                        <div className="card-info">
                            <div className="shimmer-line shimmer-bg" style={{ width: '80%' }}></div>
                            <div className="shimmer-line shimmer-bg" style={{ width: '60%' }}></div>

                            <div className="product-variants">
                                <div className="variant-section">
                                    <div className="size-options">
                                        {[...Array(3)].map((_, i) => (
                                            <span key={i} className="size-option shimmer-bg"></span>
                                        ))}
                                    </div>
                                </div>

                                <div className="variant-section">
                                    <div className="color-options">
                                        {[...Array(3)].map((_, i) => (
                                            <span key={i} className="color-circle shimmer-bg"></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductShimmer
