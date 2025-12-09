import { BASE_URL } from '@/config/apiConfig.ts';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import type { MiniProduct } from '@/DTOs/productDetails.ts';

function MensWear() {
  const [data, setData] = useState<MiniProduct[]>([]);


  useEffect(() => {
    const fetchMensTopwear = async () => {
      try {
        const getMensTopwearURL = `${BASE_URL}/api/getProduct/get-showcase-men-wears`;
        const response = await fetch(getMensTopwearURL);
        const receivedData = await response.json();
        setData(receivedData.productInfo);

        receivedData.productInfo.forEach((item: MiniProduct, index: number) => {
          console.log(`Image URL [${index}]:`, item.images?.[0]?.optimizeUrl);
        });

      } catch (error) {
        console.error("Error fetching men's topwear:", error);
      }
    };

    fetchMensTopwear();
  }, []);


  return (
    <section className="flex flex-col items-center mt-16 p-4 bg-white">
      <div className="section-heading">
        <h1>Men's Wear</h1>
      </div>

     <ProductCard single={data} />

    </section>
  );


}

export default MensWear;
