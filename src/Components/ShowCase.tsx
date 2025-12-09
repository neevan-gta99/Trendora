import { BASE_URL } from '@/config/apiConfig.ts';
import React, { useEffect, useState } from 'react';
import ProductCard2 from './ProductCard2';
import { useLocation } from 'react-router-dom';

import type { MiniProduct } from '@/DTOs/productDetails.ts';

const bbdsggdsCategories = [
    "boys-brands",
    "girls-grands",
];
const bagsCategories = [
    "bags",
    "suitcases",
    "luggages",
];

const endPoints = [
    { key: "men-topwear", label: "get-all-men-topwears" },
    { key: "men-bottomwear", label: "get-all-men-bottomwears" },
    { key: "men-footwear", label: "get-all-men-footwears" },
    { key: "women-ethnic", label: "get-all-women-ethnic" },
    { key: "women-western", label: "get-all-women-western" },
    { key: "women-footwear", label: "get-all-women-footwears" },
    { key: "boys-brands", label: "get-all-boys-brands" },
    { key: "girls-grands", label: "get-all-girls-grands" },
    { key: "mens-wa", label: "get-all-mens-wa" },
    { key: "womens-wa", label: "get-all-womens-wa" },
    { key: "boys-wa", label: "get-all-boys-wa" },
    { key: "girls-wa", label: "get-all-girls-wa" },
    { key: "bags", label: "get-all-bags" },
    { key: "suitcases", label: "get-all-suitcases" },
    { key: "luggages", label: "get-all-luggages" },
];

const allTabs = [
    { key: "men-topwear", tabValues: ['T-Shirt', 'Shirt', 'Hoodie', 'Jacket', 'Sweatshirt', 'Kurta'] },
    { key: "men-bottomwear", tabValues: ['Jeans', 'Joggers'] },
    { key: "men-footwear", tabValues: ['Shoes', 'Slippers'] },
    { key: "women-ethnic", tabValues: ['Saree', 'Kurta'] },
    { key: "women-western", tabValues: ['Tops', 'Jeans'] },
    { key: "women-footwear", tabValues: ['Heels', 'Wedges'] },
    { key: "boys-brands", tabValues: ['Topwear', 'Bottomwear', 'Footwear'] },
    { key: "girls-grands", tabValues: ['Topwear', 'Bottomwear', 'Footwear'] },
    { key: "mens-wa", tabValues: ['Watches', 'Accessories'] },
    { key: "womens-wa", tabValues: ['Watches', 'Accessories'] },
    { key: "boys-wa", tabValues: ['Watches', 'Accessories'] },
    { key: "girls-wa", tabValues: ['Watches', 'Accessories'] },
    { key: "bags", tabValues: ['Male', 'Female'] },
    { key: "suitcases", tabValues: ['Male', 'Female'] },
    { key: "luggages", tabValues: ['Male', 'Female'] },
];

function ShowCase() {
    const [allProducts, setAllProducts] = useState<MiniProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<MiniProduct[]>([]);

    const { search } = useLocation();

    // Get category from URL params
    const category = new URLSearchParams(search).get("category") || "men-topwear";

    console.log("This category: ==>", category);
    
    // Find current tab set based on category
    const currentTabSet = allTabs.find((tabGroup) => tabGroup.key === category)?.tabValues || ['T-Shirt'];

    console.log("Current Tabset==>", currentTabSet);

    // Find current endpoint based on category
    const currentEndPoint = endPoints.find((endPoint) => endPoint.key === category)?.label || "get-all-men-topwears";

    const [selectedTab, setSelectedTab] = useState<string>(currentTabSet[0] || "T-Shirt");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

    // Reset selected tab when category changes
    useEffect(() => {
        setSelectedTab(currentTabSet[0] || "T-Shirt");
    }, [category, currentTabSet]);

    console.log("Current Tabset)==>", selectedTab);
    // Fetch products when category changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching for category:", category);
                console.log("Using endpoint:", currentEndPoint);

                const getProductsURL = `${BASE_URL}/api/getProduct/${currentEndPoint}`;
                console.log("Fetching from URL:", getProductsURL);

                const response = await fetch(getProductsURL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const receivedData = await response.json();
                console.log("Received data:", receivedData);

                setAllProducts(receivedData.productInfo || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category, currentEndPoint]);

    useEffect(() => {
        if (allProducts.length > 0) {
            let filtered;
            console.log("Yaha dekho");

            if (bbdsggdsCategories.includes(category)) {
                filtered = allProducts.filter(p => p.productType === selectedTab);
            }
            else if (bagsCategories.includes(category)) {

                filtered = allProducts.filter(p => p.gender === selectedTab);
            }
            else {
                filtered = allProducts.filter(p => p.subCategory === selectedTab);
            }

            // Price filter
            filtered = filtered.filter(p => p.finalPrice >= minPrice && p.finalPrice <= maxPrice);

            // Discount filter
            if (selectedDiscounts.length > 0) {
                filtered = filtered.filter(p =>
                    selectedDiscounts.some(d => p.discount >= d)
                );
            }

            // Size filter (if products carry sizes; placeholder)
            if (selectedSizes.length > 0) {
                // Example: filtered = filtered.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
            }

            // Brand filter
            if (selectedBrands.length > 0) {
                filtered = filtered.filter(p => selectedBrands.includes(p.brand));
            }

            setFilteredProducts(filtered);
        }
    }, [selectedTab, allProducts, minPrice, maxPrice, selectedDiscounts, selectedBrands, selectedSizes, category]); // ✅ add missing deps


    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const toggleDiscount = (discount: number) => {
        setSelectedDiscounts(prev =>
            prev.includes(discount)
                ? prev.filter(d => d !== discount)
                : [...prev, discount]
        );
    };

    const clearFilters = () => {
        setMinPrice(0);
        setMaxPrice(10000);
        setSelectedSizes([]);
        setSelectedBrands([]);
        setSelectedDiscounts([]);
    };

    return (
        <section className="flex flex-col items-center bg-white">
            <div className="flex w-full max-w-7xl gap-8 p-4">
                {/* Left Side - Filters */}
                <div className="w-1/4 min-w-64 border-r pr-6">
                    <div className="sticky top-4">
                        {/* Filters Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-crimson hover:underline"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Price Range</label>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500">Min</label>
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(Number(e.target.value))}
                                            className="w-full border rounded px-2 py-1 text-sm"
                                            min="0"
                                            max={maxPrice}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500">Max</label>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            className="w-full border rounded px-2 py-1 text-sm"
                                            min={minPrice}
                                            max="10000"
                                        />
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-crimson"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>₹0</span>
                                    <span>₹10000</span>
                                </div>
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Size</label>
                            <div className="flex flex-wrap gap-2">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={`px-3 py-1.5 border rounded text-sm ${selectedSizes.includes(size)
                                            ? 'bg-crimson text-white border-crimson'
                                            : 'border-gray-300 hover:border-gray-400'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Brand</label>
                            <div className="space-y-2">
                                {['Navee', 'Puma', 'Adidas', 'Levis', 'Allen Solly'].map((brand) => (
                                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="rounded accent-crimson"
                                        />
                                        <span className="text-sm">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Discount Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Discount</label>
                            <div className="space-y-2">
                                {[10, 20, 30, 40].map((discount) => (
                                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedDiscounts.includes(discount)}
                                            onChange={() => toggleDiscount(discount)}
                                            className="rounded accent-crimson"
                                        />
                                        <span className="text-sm">{discount}% and above</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Products */}
                <div className="flex-1">
                    {/* Category Display */}
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold capitalize">
                            {category.replace('-', ' ')}
                        </h1>
                    </div>

                    {/* Tabs */}
                    <div className="tabs flex gap-2 mb-6 flex-wrap justify-center">
                        {currentTabSet.map((tabLabel: string) => (
                            <button
                                key={tabLabel}
                                onClick={() => setSelectedTab(tabLabel)}
                                className={`px-4 py-2 ${selectedTab === tabLabel
                                    ? 'bg-black text-white rounded border border-black'
                                    : 'bg-white text-black border border-black'
                                    }`}
                            >
                                {tabLabel}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <p className="text-gray-600 mb-4">
                        Showing {filteredProducts.length} products in <span className="font-semibold">{selectedTab}</span>
                    </p>

                    {/* Active Filters */}
                    {(minPrice > 0 || maxPrice < 10000 || selectedSizes.length > 0 || selectedBrands.length > 0 || selectedDiscounts.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {minPrice > 0 && (
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    Min: ₹{minPrice}
                                </span>
                            )}
                            {maxPrice < 10000 && (
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    Max: ₹{maxPrice}
                                </span>
                            )}
                            {selectedSizes.map(size => (
                                <span key={size} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    Size: {size}
                                </span>
                            ))}
                            {selectedDiscounts.map(disc => (
                                <span key={disc} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    {disc}%+ off
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Products Grid */}
                    <ProductCard2 many={filteredProducts} />

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found with current filters</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-6 py-2 bg-crimson text-white rounded hover:bg-red-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ShowCase;