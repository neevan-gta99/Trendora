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
};

type ColorAndStock = {
  color: string;
  stock: number;
};

type SizeAndVariants = {
  size: string;
  variants: ColorAndStock[];
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
