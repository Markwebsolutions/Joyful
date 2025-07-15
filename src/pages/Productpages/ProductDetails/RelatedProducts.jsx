// RelatedProducts.js
import { useState } from 'react';
import ProductDetailCard from './ProductDetailCard';

const RelatedProducts = ({ products, categoryName }) => {
    return (
        <div className="subcategory-products-container">
            {/* <h2 className="category-name page-width">More from {categoryName}</h2> */}
            {products.map((product, index) => (
                <RelatedProductItem
                    key={product.id}
                    product={product}
                    index={index}
                />
            ))}
        </div>
    );
};

const RelatedProductItem = ({ product, index }) => {
    const subVariants = product.variantsMap ? JSON.parse(product.variantsMap) : {};
    const colorVariants = subVariants.Color || [];
    const [selectedColor, setSelectedColor] = useState(colorVariants[0] || null);
    const currentMainImage = selectedColor?.image || product.mainimage;

    return (
        <section
            className="section-alt"
            style={{
                backgroundColor: index % 2 === 0 ? '#F5EDDA' : '#F2F3FB'
            }}
        >
            <div className="page-width">
                <div className="subcategory-product-item">
                    <div className="subcategory-name">{product.subcategory}</div>
                    <ProductDetailCard
                        product={product}
                        selectedColor={selectedColor}
                        selectedSize={null}
                        colorVariants={colorVariants}
                        sizeVariants={subVariants.Size || []}
                        onColorChange={(color) => setSelectedColor(color)}
                        onSizeChange={() => { }}
                        currentMainImage={currentMainImage}
                        descriptionLines={product.description?.split('\n').filter(line => line.trim() !== '') || []}
                        isCompact
                    />

                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;