import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
    fetchProducts,
    setSelectedCategory,
    setSelectedSubcategory,
    setIsMobileView
} from '../../features/productsSlice';
import ProductShimmer from './ProductShimmer';
import ProductGridCard from './ProductGrid/ProductGridCard';
import FilterSidebar from './ProductFilter/FilterSidebar';
import MobileFilterDropdown from './ProductFilter/MobileFilterDropdown';
import './Product.css';

const Product2 = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Select only needed data from Redux store
    const {
        data,
        loading,
        error,
        selectedCategory,
        selectedSubcategory,
        isMobileView
    } = useSelector((state) => ({
        data: state.products.data,
        loading: state.products.loading,
        error: state.products.error,
        selectedCategory: state.products.selectedCategory,
        selectedSubcategory: state.products.selectedSubcategory,
        isMobileView: state.products.isMobileView
    }));

    // Handle category selection from location state
    useEffect(() => {
        if (location.state?.selectedCategory) {
            dispatch(setSelectedCategory(location.state.selectedCategory));
            dispatch(setSelectedSubcategory(null));
        }
    }, [location.state, dispatch]);

    // Handle URL parameters on initial load
    useEffect(() => {
        const urlCategory = searchParams.get('category');
        const urlCategoryId = searchParams.get('categoryId');

        if (urlCategory && urlCategoryId) {
            dispatch(setSelectedCategory(urlCategory));
            dispatch(setSelectedSubcategory(null));
        }
    }, [searchParams, dispatch]);

    // Memoize all derived data with more efficient processing
    const { categories, filteredProducts } = useMemo(() => {
        // Early return if no data
        if (!data.length) return { categories: [], filteredProducts: [] };

        // Process categories for the filter sidebar
        const categories = [
            { name: 'All Categories', subcategories: [], imagelink: null },
            ...data.map(category => ({
                name: category.name,
                imagelink: category.imagelink,
                subcategories: category.subcategories.map(sub => sub.name)
            }))
        ];

        // Flatten and filter products in a single pass when possible
        let filteredProducts = [];
        for (const category of data) {
            // Skip processing if we have a category selected and it doesn't match
            if (selectedCategory && selectedCategory !== 'All Categories' && category.name !== selectedCategory) {
                continue;
            }

            for (const subcategory of category.subcategories) {
                // Skip processing if we have a subcategory selected and it doesn't match
                if (selectedSubcategory && subcategory.name !== selectedSubcategory) {
                    continue;
                }

                // Add products that are published and match filters
                for (const product of subcategory.products) {
                    if (product.ispublished) {
                        filteredProducts.push({
                            ...product,
                            category: category.name,
                            subcategory: subcategory.name
                        });
                    }
                }
            }
        }

        return { categories, filteredProducts };
    }, [data, selectedCategory, selectedSubcategory]);

    // Memoize event handlers
    const handleCategorySelect = useCallback((category) => {
        dispatch(setSelectedCategory(category));
    }, [dispatch]);

    const handleSubcategorySelect = useCallback((subcategory) => {
        dispatch(setSelectedSubcategory(subcategory));
    }, [dispatch]);

    // Setup resize listener and fetch products
    useEffect(() => {
        const handleResize = () => {
            dispatch(setIsMobileView(window.innerWidth < 768));
        };

        dispatch(fetchProducts());
        handleResize(); // Set initial value

        const resizeListener = () => {
            window.requestAnimationFrame(handleResize);
        };

        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    }, [dispatch]);

    if (error) return <div className="page-width">Error: {error}</div>;

    return (
        <div className="page-width">
            <div className="product-container">
                {isMobileView ? (
                    <MobileFilterDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={handleCategorySelect}
                        setSelectedSubcategory={handleSubcategorySelect}
                    />
                ) : (
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
                                <ProductGridCard
                                    key={`${product.id}-${product.category}-${product.subcategory}`}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product2;