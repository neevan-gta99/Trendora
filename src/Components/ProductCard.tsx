import type { MiniProduct } from "@/DTOs/productDetails";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ single }: { single: MiniProduct[] }) => {

  const navigate = useNavigate();

  const goToShowcase = (category: string) => {

    const words = category
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(/\s+/);
  
  // 2. सभी words को lowercase करो
  const lowercasedWords = words.map(word => word.toLowerCase());
  const cleanedCategory = lowercasedWords.join('-');

  console.log("LowerCase Words ==> ",cleanedCategory)

    navigate(`/showcase?category=${encodeURIComponent(cleanedCategory)}`);

  }

  return (
    <div className="section-wear">
      {single.map((item, index) => (
        <div key={index} className="section-offer-2" onClick={() => goToShowcase(item.category)}>
          <img
            src={item.images?.[0]?.optimizeUrl}
            alt={item.name}
            className="section-imgs"
          />
          <h4 className="section-item-name">{item.name}</h4>
          <p className="section-item-subcategory">{item.subCategory}</p>
          <p className="section-item-discount">{item.discount}% Off</p>
          <p className="section-item-finalprice">₹{Math.round(item.finalPrice)}</p>
        </div>
      ))}
    </div>
  );
};


export default ProductCard;