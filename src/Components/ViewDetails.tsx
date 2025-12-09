import { useEffect, useState } from "react";
import type { WholeProduct } from "@/DTOs/productDetails.ts";
import { BASE_URL } from "@/config/apiConfig";
import { useLocation } from "react-router-dom";


function ViewDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productID = queryParams.get("productId");
  const category = queryParams.get("category");

  const [allProducts, setAllProducts] = useState<WholeProduct[] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    const getParticularProductDetails = async () => {
      try {
        const getProductsURL = `${BASE_URL}/api/getProduct/perProduct?productID=${productID}&category=${encodeURIComponent(category || "")}`;
        const response = await fetch(getProductsURL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const receivedData = await response.json();
        setAllProducts(receivedData.productInfo);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    getParticularProductDetails();
  }, []);

  // pick first product safely
  const oneProduct = allProducts?.[0];

  if (!oneProduct) {
    return <p className="p-6">Loading product details...</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center">
        <img
          src={oneProduct.images?.[0]?.optimizeUrl}
          alt={oneProduct.name}
          className="w-80 h-96 object-cover rounded-lg shadow-md"
        />

        {/* Add to Cart Counter */}
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold"
          >
            +
          </button>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition w-min"
          // onClick={() => console.log('Added to cart:', item.productID)}
        >
          Add To Cart
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{oneProduct.name}</h2>
        <p className="text-gray-600 mb-1">Brand: {oneProduct.brand}</p>
        <p className="text-gray-600 mb-1">Price: ₹{Math.round(oneProduct.finalPrice)}</p>
        <p className="text-gray-600 mb-1">Discount: {oneProduct.discount}%</p>
        <p className="text-gray-600 mb-1">Material: {oneProduct.material}</p>
        <p className="text-gray-600 mb-1">Fit: {oneProduct.fit}</p>
        <p className="text-gray-600 mb-1">Sleeve: {oneProduct.sleeve}</p>
        <p className="text-gray-600 mb-1">Neck: {oneProduct.neck}</p>

        {/* Sizes and Colors */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Available Sizes & Colors:</h3>
          {oneProduct.variants.map(sizeObj => (
            <div key={sizeObj.size} className="mb-3">
              <p className="font-medium">Size: {sizeObj.size}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {sizeObj.variants.map(variant => (
                  <span
                    key={variant.color}
                    className="px-3 py-1 border rounded text-sm bg-gray-100"
                  >
                    {variant.color} ({variant.stock})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ViewDetails;
