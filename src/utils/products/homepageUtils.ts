import type { HomepageData, MiniProduct } from '@/DTOs/productDetails.ts';

export class HomepageUtils {
  // Get all products from a specific schema
  static getProductsBySchema(data: HomepageData, schemaCode: string): MiniProduct[] {
    const products: MiniProduct[] = [];
    
    for (const showcase of Object.values(data.showcases)) {
      if (showcase.sourceSchemas.includes(schemaCode)) {
        products.push(...showcase.data);
      }
    }
    
    return products;
  }
  
  // Get products by category (mens, womens, etc.)
  static getProductsByCategory(data: HomepageData, category: keyof HomepageData['categories']): MiniProduct[] {
    const schemaCodes = data.categories[category] || [];
    const products: MiniProduct[] = [];
    
    for (const schemaCode of schemaCodes) {
      products.push(...this.getProductsBySchema(data, schemaCode));
    }
    
    return products;
  }
  
  // Get hot products (since you have hot: boolean in schema)
  static getHotProducts(data: HomepageData, limit?: number): MiniProduct[] {
    let allProducts: MiniProduct[] = [];
    
    for (const showcase of Object.values(data.showcases)) {
      allProducts.push(...showcase.data);
    }
    
    const hotProducts = allProducts.filter(product => product.hot === true);
    
    return limit ? hotProducts.slice(0, limit) : hotProducts;
  }
  
  // Get products on sale (using your isOnSale field)
  static getProductsOnSale(data: HomepageData): MiniProduct[] {
    const allProducts: MiniProduct[] = [];
    
    for (const showcase of Object.values(data.showcases)) {
      allProducts.push(...showcase.data);
    }
    
    return allProducts.filter(product => 
      product.discount > 0 || (product as any).isOnSale === true
    );
  }
  
  // Search products
  static searchProducts(data: HomepageData, searchTerm: string): MiniProduct[] {
    const allProducts: MiniProduct[] = [];
    const term = searchTerm.toLowerCase();
    
    for (const showcase of Object.values(data.showcases)) {
      allProducts.push(...showcase.data);
    }
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }
  
  // Get unique brands
  static getUniqueBrands(data: HomepageData): string[] {
    const brands = new Set<string>();
    
    for (const showcase of Object.values(data.showcases)) {
      showcase.data.forEach(product => {
        if (product.brand) {
          brands.add(product.brand);
        }
      });
    }
    
    return Array.from(brands);
  }
  
  // Calculate total discount value
  static getTotalDiscountValue(data: HomepageData): number {
    let totalDiscount = 0;
    
    for (const showcase of Object.values(data.showcases)) {
      showcase.data.forEach(product => {
        if (product.discount && product.price) {
          totalDiscount += (product.price * product.discount) / 100;
        }
      });
    }
    
    return totalDiscount;
  }
}