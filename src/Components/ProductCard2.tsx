import React from 'react'
import { useNavigate } from 'react-router-dom';

import type { MiniProduct } from '@/DTOs/productDetails.ts';


const ProductCard2 = ({ many }: { many: MiniProduct[] }) => {

    const navigate = useNavigate();
    const category = many.length > 0 ? many[0].category : "";

    return (
        <>

            <div className="section-wear">
                {many.map((item, index) => (
                    <div key={`${item.productID}-${index}`} className="section-offer relative" onClick={() => navigate(`/view-details?productId=${item.productID}&category=${category}`)}>
                        {/* Discount Badge */}
                        {item.discount > 0 && (
                            <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                {item.discount}% OFF
                            </div>
                        )}

                        <img
                            src={item.images?.[0]?.optimizeUrl || '/placeholder.jpg'}
                            alt={item.name}
                            className="section-imgs"
                        />
                        <h4 className="section-item-name">{item.name}</h4>
                        <h6 className="section-item-brand">{item.brand}</h6>
                        <p className="section-item-finalprice">₹{Math.round(item.finalPrice)}</p>
                        <p className="section-item-price">₹{item.price}</p>

                    </div>
                ))}
            </div>

        </>
    )
}

export default ProductCard2;
