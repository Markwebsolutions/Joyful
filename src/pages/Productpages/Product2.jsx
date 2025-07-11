import '../Productpages/Product.css';
import { useState, useEffect } from 'react';
import ProductShimmer from './ProductShimmer';
import ProductGridCard from './ProductGrid/ProductGridCard';
import MobileFilterDropdown from './ProductFilter/MobileFilterDropdown';
import FilterSidebar from './ProductFilter/FilterSidebar';

const Product2 = () => {
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://joyful-backend-backend-final-4-production.up.railway.app/categories');
                if (!response.ok) throw new Error('Failed to fetch data');

                const data = await response.json();
                const publishedCategories = data.filter(category => category.published);

                const processedCategories = [
                    {
                        name: 'All Categories',
                        subcategories: []
                    },
                    ...publishedCategories.map(category => ({
                        ...category,
                        subcategories: category.subcategories
                            .filter(sub => sub.ispublished)
                            .map(sub => sub.name)
                    }))
                ];

                const processedProducts = publishedCategories.flatMap(category =>
                    category.subcategories
                        .filter(sub => sub.ispublished)
                        .flatMap(sub =>
                            sub.products
                                .filter(product => product.ispublished)
                                .map(product => ({
                                    ...product,
                                    category: category.name,
                                    subcategory: sub.name,
                                    variants: product.variantsMap ? JSON.parse(product.variantsMap) : {}
                                }))
                        )
                );

                setCategories(processedCategories);
                setAllProducts(processedProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                />

                {/* Desktop filter navigation */}
                <FilterSidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                />

                {/* Product grid */}
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