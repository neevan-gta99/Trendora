import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard';
import { BASE_URL } from '@/config/apiConfig';
import { useNavigate } from 'react-router-dom';

type Product = {
    name: string;
    subCategory: string;
    discount: number;
    finalPrice: number;
    images?: {
        optimizeUrl: string;
    }[];
};


const Suitcases = () => {
    const [data, setData] = useState<Product[]>([]);
    const [subCategoryOfMenWear, setSubCategoryOfMenWear] = useState<null | string>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchMensTopwear = async () => {
            try {
                const getMensTopwearURL = `${BASE_URL}/api/getProduct/get-showcase-suitcases`;
                const response = await fetch(getMensTopwearURL);
                const receivedData = await response.json();
                setData(receivedData.productInfo);

                receivedData.productInfo.forEach((item: Product, index: number) => {
                    console.log(`Image URL [${index}]:`, item.images?.[0]?.optimizeUrl);
                });

            } catch (error) {
                console.error("Error fetching men's topwear:", error);
            }
        };

        fetchMensTopwear();
    }, []);


    useEffect(() => {
        if (subCategoryOfMenWear) {
            navigate(`/showcase?subCategory=${encodeURIComponent(subCategoryOfMenWear)}`);
        }
    }, [subCategoryOfMenWear]);

    return (
        <>
            <section className="flex flex-col items-center mt-16 p-4 bg-white">
                <div className="section-heading">
                    <h1>Suitcases </h1>
                </div>

                <ProductCard single={data} />

            </section>
        </>
    )
}

export default Suitcases;
