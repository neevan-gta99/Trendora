// DTOs/productDetails.ts
export type ColorAndStock = {
  color: string;
  stock: number;
};

export type SizeAndVariants = {
  size: string;
  variants: ColorAndStock[];
};

export type MiniProduct = {
  productID: string;
  name: string;
  brand: string;
  category: string;
  productType: string;
  subCategory: string;
  gender: string;
  discount: number;
  price: number;
  finalPrice: number;
  images?: { optimizeUrl: string }[];
  // Additional fields that might exist in your Redis cache
  hot?: boolean;
  status?: string;
  schema?: string;
  productCode?: string;
};

export type WholeProduct = {
  productID: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  productType: string;
  gender: string;
  totalStock: number;
  price: number;
  discount: number;
  isOnSale: boolean;
  material: string;
  fit: string;
  sleeve: string;
  neck: string;
  status: string;
  variants: SizeAndVariants[];
  images?: { optimizeUrl: string }[];
  createdAt: string;
  finalPrice: number;
  sku: string;
  hot: boolean;
  sellerID: string;
};

// For homepage showcase sections
export interface ShowcaseSection {
  key: string;
  redisId: string;
  data: MiniProduct[]; // Using YOUR MiniProduct type
  timestamp: string;
  sourceSchemas: string[];
  count: number;
}

export interface HomepageData {
  productInfo: {
    metadata: {
      version: string;
      cachedAt: string;
      ttl: number;
      sectionsCount: number;
    };
    showcases: {
      mensWear: ShowcaseSection;
      womensWear: ShowcaseSection;
      boysBrands: ShowcaseSection;
      girlsGrands: ShowcaseSection;
      bags: ShowcaseSection;
      suitcases: ShowcaseSection;
      luggages: ShowcaseSection;
    };
    categories: {
      mens: string[];
      womens: string[];
      boys: string[];
      girls: string[];
      accessories: string[];
    };
    stats: {
      totalProducts: number;
      lastUpdated: string;
    };
  }
}

export interface HomepageState {
  data: HomepageData | null;
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
  filteredProducts: MiniProduct[]; // ✅ Naya field add karo
}