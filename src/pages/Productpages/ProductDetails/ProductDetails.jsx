import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ProductDetailsShimmer from "./ProductDetailsShimmer";
import ProductDetailCard from "./ProductDetailCard";
import RelatedProducts from "./RelatedProducts";
import Section5 from "../../homepage/Section5";
import FeedBack from "../feedback/FeedBack";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { categorySlug, subcategorySlug, productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    const slugify = (text) =>
      text?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

    const matched = products
      .flatMap((cat) =>
        cat.subcategories.map((sub) => ({
          ...sub,
          categoryName: cat.name,
        }))
      )
      .flatMap((sub) =>
        sub.products.map((prod) => ({
          ...prod,
          categoryName: sub.categoryName,
          subcategoryName: sub.name,
        }))
      )
      .find((prod) => {
        return (
          slugify(prod.categoryName) === categorySlug &&
          slugify(prod.subcategoryName) === subcategorySlug &&
          slugify(prod.name) === productSlug &&
          prod.ispublished
        );
      });

    if (matched) {
      setProduct(matched);
      setError(null);
    } else {
      setError("Product not found");
    }

    setLoading(false);
  }, [products, categorySlug, subcategorySlug, productSlug]);

  const { variants, colorVariants, sizeVariants, capacityVariants } =
    useMemo(() => {
      if (!product)
        return {
          variants: {},
          colorVariants: [],
          sizeVariants: [],
          capacityVariants: [],
        };

      const variants = product.variantsMap || {};
      return {
        variants,
        colorVariants: variants.Color || [],
        sizeVariants: variants.Size || [],
        capacityVariants: variants.Capacity || [],
      };
    }, [product]);

  const [selectedColor, setSelectedColor] = useState(colorVariants[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizeVariants[0] || null);
  const [selectedCapacity, setSelectedCapacity] = useState(
    capacityVariants[0] || null
  );

  const currentMainImage = selectedColor?.image || product?.mainimage || "";
  const descriptionLines = useMemo(
    () =>
      product?.description?.split("\n").filter((line) => line.trim() !== "") ||
      [],
    [product]
  );

  const handleColorChange = useCallback((color) => setSelectedColor(color), []);
  const handleSizeChange = useCallback((size) => setSelectedSize(size), []);
  const handleCapacityChange = useCallback(
    (capacity) => setSelectedCapacity(capacity),
    []
  );

  if (loading) return <ProductDetailsShimmer />;
  if (error)
    return <div className="page-width error-message">Error: {error}</div>;
  if (!product)
    return <div className="page-width error-message">Product not found</div>;

  return (
    <>
      <section className="product-details-section section-alt">
        <div className="page-width">
          <div className="breadcrumb">Home / {product.name}</div>
          <ProductDetailCard
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedCapacity={selectedCapacity}
            colorVariants={colorVariants}
            sizeVariants={sizeVariants}
            capacityVariants={capacityVariants}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
            onCapacityChange={handleCapacityChange}
            currentMainImage={currentMainImage}
            descriptionLines={descriptionLines}
          />
        </div>
      </section>

      <RelatedProducts />
      <FeedBack />
      <Section5 />
    </>
  );
};

export default ProductDetails;
