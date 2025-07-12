import '../Productpages/Product.css';
import { useState, useEffect } from 'react';
import ProductShimmer from './ProductShimmer';
import ProductGridCard from './ProductGrid/ProductGridCard';
import MobileFilterDropdown from './ProductFilter/MobileFilterDropdown';
import FilterSidebar from './ProductFilter/FilterSidebar';

import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, refreshProducts } from '../../features/productsSlice';

const Product2 = () => {
    const dispatch = useDispatch();
    const {
        data: allProducts,
        categories: processedCategories,
        status,
        error,
    } = useSelector(state => state.products);

    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }

        // Hide loading indicator once we have data
        if (status === 'succeeded') {
            setLocalLoading(false);
        }
    }, [status, dispatch]);

    const filteredProducts = allProducts.filter(product => {
        if (selectedCategory === 'All Categories') return true;
        if (selectedSubcategory) {
            return product.category === selectedCategory && product.subcategory === selectedSubcategory;
        }
        return product.category === selectedCategory;
    });

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="product-container my-20">
                {/* Mobile filter dropdown */}
                <MobileFilterDropdown
                    categories={processedCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                />

                {/* Desktop filter navigation */}
                <FilterSidebar
                    categories={processedCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                />

                {/* Product grid */}
                {(status === 'loading' || localLoading) ? (
                    <ProductShimmer />
                ) : filteredProducts.length === 0 ? (
                    <div className="product-content">
                        <div className="no-products">No products found in this category</div>
                    </div>
                ) : (
                    <div className="product-content">
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <ProductGridCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product2;