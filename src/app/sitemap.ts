import { ProductService } from "@/services/api/productService";

export default async function sitemap() {
  const products = await ProductService.getAllProducts();
  const product = products?.map((product) => ({
    url: `https://www.emadhyam.com/product/${product._id}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.emadhyam.com",
      lastmod: new Date().toISOString(),
    },
    ...product,
  ];
}
