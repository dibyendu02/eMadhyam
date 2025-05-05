import { ProductService } from "@/services/api/productService";

// Define an interface for the sitemap URL entries
interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
}

export default async function sitemap() {
  // Initialize with explicit type
  let productUrls: SitemapEntry[] = [];

  try {
    const products = await ProductService.getAllProducts();

    if (products && Array.isArray(products)) {
      productUrls = products.map((product) => ({
        url: `https://www.emadhyam.com/product/${product._id}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    // Fallback to known product IDs
    const fallbackProductIds = ["id1", "id2", "id3"]; // Replace with actual product IDs
    productUrls = fallbackProductIds.map((id) => ({
      url: `https://www.emadhyam.com/product/${id}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));
  }

  return [
    {
      url: "https://www.emadhyam.com",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1.0,
    },
    ...productUrls,
  ];
}
