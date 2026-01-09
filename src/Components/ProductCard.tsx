// components/ProductCard.tsx
import type { MiniProduct } from "@/DTOs/productDetails";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const ProductCard = ({ single }: { single: MiniProduct[] }) => {
  const navigate = useNavigate();

  // Memoized navigation handler
  const goToShowcase = useCallback((category: string) => {
    const words = category
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(/\s+/);

    const lowercasedWords = words.map((word) => word.toLowerCase());
    const cleanedCategory = lowercasedWords.join("-");

    console.log("LowerCase Words ==> ", cleanedCategory);
    navigate(`/showcase?category=${encodeURIComponent(cleanedCategory)}`);
  }, [navigate]);

  if (!single || single.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products to display</p>
      </div>
    );
  }

  return (
    <div className="section-wear">
      {single.map((item, index) => (
        <div
          key={`${item.productID}-${index}`}
          className="section-offer-2"
          onClick={() => goToShowcase(item.category || "")}
        >
          {/* Product Image */}
          {item.images?.[0]?.optimizeUrl ? (
            <img
              src={item.images[0].optimizeUrl}
              alt={item.name}
              className="section-imgs"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}

          {/* Product Info */}
          <h4 className="section-item-name">{item.name}</h4>
          {item.subCategory && (
            <p className="section-item-subcategory">{item.subCategory}</p>
          )}

          {/* Discount + Price */}
          {item.discount > 0 && (
            <p className="section-item-discount">{item.discount}% Off</p>
          )}
          <p className="section-item-finalprice">
            ₹{Math.round(item.finalPrice)}
          </p>

        </div>
      ))}
    </div>
  );
};

export default ProductCard;
