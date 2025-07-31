import './Product.css';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,  // Make sure this matches the export name exactly
    setSelectedCategory,
    setSelectedSubcategory,
    setIsMobileView
} from '../../features/productsSlice';  // Verify the correct path
import ProductShimmer from './ProductShimmer';
import ProductGridCard from './ProductGrid/ProductGridCard';
import FilterSidebar from './ProductFilter/FilterSidebar';
import MobileFilterDropdown from './ProductFilter/MobileFilterDropdown';

const Product2 = () => {
    const dispatch = useDispatch();
    const {
        data,
        loading,
        error,
        selectedCategory,
        selectedSubcategory,
        isMobileView
    } = useSelector((state) => state.products); // Make sure this matches your store configuration

    // Memoize all derived data
    const { allProducts, categories, filteredProducts } = useMemo(() => {
        // Flatten all products with their category/subcategory info
        const allProducts = data.flatMap(category =>
            category.subcategories.flatMap(subcategory =>
                subcategory.products.map(product => ({
                    ...product,
                    category: category.name,
                    subcategory: subcategory.name
                }))
            )
        );

        // Get unique categories for the filter sidebar
        const categories = [
            { name: 'All Categories', subcategories: [] },
            ...data.map(category => ({
                name: category.name,
                imagelink: category.imagelink,
                subcategories: category.subcategories.map(sub => sub.name)
            }))
        ];

        // Filter products based on selections
        const filteredProducts = allProducts.filter(product => {
            if (!product.ispublished) return false;
            if (selectedCategory === 'All Categories') return true;
            if (selectedSubcategory) {
                return product.category === selectedCategory &&
                    product.subcategory === selectedSubcategory;
            }
            return product.category === selectedCategory;
        });

        return { allProducts, categories, filteredProducts };
    }, [data, selectedCategory, selectedSubcategory]);

    useEffect(() => {
        dispatch(fetchProducts());

        const handleResize = () => {
            dispatch(setIsMobileView(window.innerWidth < 768));
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category));
    };

    const handleSubcategorySelect = (subcategory) => {
        dispatch(setSelectedSubcategory(subcategory));
    };

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="product-container my-20">
                {/* Mobile Filter Dropdown - only shown on mobile */}
                {isMobileView && (
                    <MobileFilterDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={handleCategorySelect}
                        setSelectedSubcategory={handleSubcategorySelect}
                    />
                )}

                {/* Desktop Filter Sidebar - only shown on desktop */}
                {!isMobileView && (
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={handleCategorySelect}
                        selectedSubcategory={selectedSubcategory}
                        setSelectedSubcategory={handleSubcategorySelect}
                    />
                )}

                {loading ? (
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