import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import {
  fetchProducts,
  setSelectedCategory,
  setSelectedSubcategory,
  setIsMobileView,
} from "../../features/productsSlice";
import ProductShimmer from "./ProductShimmer";
import ProductGridCard from "./ProductGrid/ProductGridCard";
import FilterSidebar from "./ProductFilter/FilterSidebar";
import MobileFilterDropdown from "./ProductFilter/MobileFilterDropdown";
import "./Product.css";

const Product2 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { categorySlug, subcategorySlug } = useParams();

  const {
    data,
    loading,
    error,
    selectedCategory,
    selectedSubcategory,
    isMobileView,
  } = useSelector((state) => ({
    data: state.products.data,
    loading: state.products.loading,
    error: state.products.error,
    selectedCategory: state.products.selectedCategory,
    selectedSubcategory: state.products.selectedSubcategory,
    isMobileView: state.products.isMobileView,
  }));

  const slugify = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

  const deslugify = (slug) =>
    slug?.replace(/-/g, " ").replace(/\band\b/gi, "&").toLowerCase();

  // Sync slug URL to Redux state
  useEffect(() => {
    if (categorySlug && data.length > 0) {
      const matchedCategory = data.find(
        (cat) => slugify(cat.name) === categorySlug
      );

      if (matchedCategory) {
        dispatch(setSelectedCategory(matchedCategory.name));

        if (subcategorySlug) {
          const matchedSub = matchedCategory.subcategories.find(
            (sub) => slugify(sub.name) === subcategorySlug
          );
          dispatch(setSelectedSubcategory(matchedSub?.name || null));
        } else {
          dispatch(setSelectedSubcategory(null));
        }
      } else {
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedSubcategory(null));
      }
    }
  }, [categorySlug, subcategorySlug, data, dispatch]);

  // Handle fallback legacy URL query params (optional)
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlCategoryId = searchParams.get("categoryId");

    if (urlCategory && urlCategoryId) {
      dispatch(setSelectedCategory(urlCategory));
      dispatch(setSelectedSubcategory(null));
    }
  }, [searchParams, dispatch]);

  // Handle category selection from router state (fallback support)
  useEffect(() => {
    if (location.state?.selectedCategory) {
      dispatch(setSelectedCategory(location.state.selectedCategory));
      dispatch(setSelectedSubcategory(null));
    }
  }, [location.state, dispatch]);

  // Setup resize listener + fetch products
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobileView(window.innerWidth < 768));
    };

    dispatch(fetchProducts());
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Filtering and category structuring
  const { categories, filteredProducts } = useMemo(() => {
    if (!data.length) return { categories: [], filteredProducts: [] };

    const categories = [
      { name: "All Categories", subcategories: [], imagelink: null },
      ...data.map((category) => ({
        name: category.name,
        imagelink: category.imagelink,
        subcategories: category.subcategories.map((sub) => sub.name),
      })),
    ];

    let filteredProducts = [];

    for (const category of data) {
      if (
        selectedCategory &&
        selectedCategory !== "All Categories" &&
        category.name !== selectedCategory
      ) {
        continue;
      }

      for (const subcategory of category.subcategories) {
        if (
          selectedSubcategory &&
          subcategory.name !== selectedSubcategory
        ) {
          continue;
        }

        for (const product of subcategory.products) {
          if (product.ispublished) {
            filteredProducts.push({
              ...product,
              category: category.name,
              subcategory: subcategory.name,
            });
          }
        }
      }
    }

    return { categories, filteredProducts };
  }, [data, selectedCategory, selectedSubcategory]);

  const handleCategorySelect = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  const handleSubcategorySelect = useCallback(
    (subcategory) => {
      dispatch(setSelectedSubcategory(subcategory));
    },
    [dispatch]
  );

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
            <div className="no-products">
              No products found in this category
            </div>
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
