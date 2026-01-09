// components/HomeComponents/MensWear.tsx
import React, { useEffect } from 'react';
import ProductCard from '../ProductCard';
import type { MiniProduct } from '@/DTOs/productDetails.ts';
import { useMensWear } from '@/customHooks/useHomeRedisData';

function MensWear() {
  const { products, loading, error, refetch } = useMensWear();

  // Log images (your existing functionality)
  useEffect(() => {
    if (products.length > 0) {
      products.forEach((item: MiniProduct, index: number) => {
        console.log(`Image URL [${index}]:`, item.images?.[0]?.optimizeUrl);
      });
    }    
  }, [products]);

  // Handle errors
  if (error) {
    return (
      <section className="flex flex-col items-center mt-16 p-4 bg-white">
        <div className="section-heading">
          <h1>Men's Wear</h1>
        </div>
        <div className="mt-4 text-center">
          <p className="text-red-600 mb-3">Failed to load: {error}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Show loading indicator (simple)
  if (loading && products.length === 0) {
    return (
      <section className="flex flex-col items-center mt-16 p-4 bg-white">
        <div className="section-heading">
          <h1>Men's Wear</h1>
        </div>
        <div className="mt-8">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (products.length === 0) {
    return (
      <section className="flex flex-col items-center mt-16 p-4 bg-white">
        <div className="section-heading">
          <h1>Men's Wear</h1>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500">No products available</p>
          <button 
            onClick={refetch}
            className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Refresh
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center mt-16 p-4 bg-white">
      <div className="section-heading text-center">
        <h1>Men's Wear</h1>
      </div>

      <ProductCard single={products} />
    </section>
  );
}

export default MensWear;