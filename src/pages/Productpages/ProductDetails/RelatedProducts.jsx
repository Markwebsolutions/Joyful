import { useState } from 'react';
import ProductDetailCard from './ProductDetailCard';

const RelatedProducts = ({ products, categoryName }) => {
    return (
        <div className="subcategory-products-container">
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
    const sizeVariants = subVariants.Size || [];
    const [selectedColor, setSelectedColor] = useState(colorVariants[0] || null);
    const [selectedSize, setSelectedSize] = useState(sizeVariants[0] || null);
    const [currentMainImage, setCurrentMainImage] = useState(
        selectedColor?.image || product.mainimage
    );
    const descriptionLines = product.description?.split('\n').filter(line => line.trim() !== '') || [];

    const handleColorChange = (color) => {
        setSelectedColor(color);
        if (color.image) {
            setCurrentMainImage(color.image);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        if (size.image) {
            setCurrentMainImage(size.image);
        }
    };

    return (
        <section className="section-alt" style={{
            backgroundColor: index % 2 === 0 ? '#F5EDDA' : '#F2F3FB'
        }}>
            <div className="page-width">
                <div className="subcategory-product-item">
                    <div className="subcategory-name">{product.subcategory}</div>
                    <ProductDetailCard
                        product={product}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                        colorVariants={colorVariants}
                        sizeVariants={sizeVariants}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                        currentMainImage={currentMainImage}
                        descriptionLines={descriptionLines}
                    />
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;